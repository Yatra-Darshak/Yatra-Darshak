import google.generativeai as genai
import json
import time
import typing
import fastapi
import fastapi.responses
import fastapi.staticfiles
import os

# ---- Configuration ----
GOOGLE_API_KEY = "AIzaSyAMIkMYkcQrSVKx6gWaMyRq0UVd-TnDyHc"
if not GOOGLE_API_KEY:
    raise RuntimeError("Set GOOGLE_API_KEY environment variable before running.")

genai.configure(api_key=GOOGLE_API_KEY)
MODEL = "gemini-1.5-flash"

# ---- Load knowledge base ----
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KB_PATH = os.path.join(BASE_DIR, "data", "knowledge_base.json")
if not os.path.exists(KB_PATH):
     raise FileNotFoundError(f"Knowledge base not found at {KB_PATH}")

with open(KB_PATH, "r", encoding="utf-8") as f:
     KNOWLEDGE_BASE = json.load(f)

# ---- App + static ----
app = fastapi.FastAPI()

if not os.path.exists(KB_PATH):
    raise FileNotFoundError(f"Knowledge base not found at {KB_PATH}")
with open(KB_PATH, "r", encoding="utf-8") as f:
     KNOWLEDGE_BASE = json.load(f)
     
# ---- In-memory session store ----
SESSIONS: typing.Dict[str, typing.Dict[str, typing.Any]] = {}

# ---- Helpers ----
def detect_intent(message: str) -> str:
    msg = message.lower()
    trip_keywords = ["plan", "itinerary", "trip", "days", "day", "visit", "travel", "itenerary", "itineary"]
    info_keywords = ["what", "when", "how", "distance", "famous", "best time", "how far", "where is", "tell me about", "food", "open", "timing"]
    if any(k in msg for k in trip_keywords):
        return "trip_plan"
    if any(k in msg for k in info_keywords):
        return "info_query"
    return "unknown"

def build_system_prompt() -> str:
    kb_summary = []
    for place, info in KNOWLEDGE_BASE.items():
        attractions = ", ".join([a["name"] for a in info.get("attractions", [])])
        food = ", ".join(info.get("food", []))
        best_time = info.get("best_time", "N/A")
        kb_summary.append(f"{place}: attractions({attractions}); food({food}); best_time({best_time}).")
    kb_text = "\n".join(kb_summary)
    return (
        "You are a helpful, friendly travel assistant specialized in Bhopal, Ujjain and nearby attractions. "
        "Use the factual knowledge provided to answer queries accurately. "
        "When asked to create an itinerary, produce a clear day-wise plan with realistic activities and travel times. "
        "If something is not in the knowledge base, say you don't know. " "Answer naturally using knowledge base. If unknown, say 'I don't know'."
        f"KnowledgeBase:\n{kb_text}"
    )

def build_itinerary_prompt(slots: typing.Dict[str, typing.Any], user_message: str) -> typing.Tuple[str, str]:
    destination = slots.get("destination")
    days = slots.get("days")
    interests = slots.get("interests", [])
    timing = slots.get("timing", "")
    system = build_system_prompt()
    user_instructions = (
        f"User request: {user_message}\n"
        f"Slots: destination={destination}, days={days}, interests={interests}, timing={timing}\n\n"
        "Produce a day-by-day itinerary in a friendly tone. For each day include: morning/afternoon/evening suggestions, travel times, food, and one backup option."
    )
    return system, user_instructions

def build_info_prompt(user_question: str) -> typing.Tuple[str, str]:
    system = build_system_prompt()
    user = f"User asked: {user_question}\n\nAnswer using facts from the knowledge base. Keep answer concise and helpful."
    return system, user

def call_ai(user_message: str, session_history: typing.List[typing.Dict[str, str]]) -> str:
    context_text = "\n".join([f"{m['from']}: {m['text']}" for m in session_history])
    full_prompt = f"{context_text}\nUser: {user_message}" if context_text else f"User: {user_message}"

    model = genai.GenerativeModel(MODEL)
    resp = model.generate_content(prompt=f"System:\n{build_system_prompt()}\n\n{full_prompt}")
    print(resp)
    return getattr(resp, "text", "No response from AI.").strip()

# ---- Session handling ----
def get_session(user_id: str) -> typing.Dict[str, typing.Any]:
    session = SESSIONS.get(user_id)
    if not session:
        session = {
            "created_at": time.time(),
            "last_active": time.time(),
            "state": "ask_days",
            "slots": {"days": None, "destination": None, "interests": None, "timing": None},
            "history": []
        }
        SESSIONS[user_id] = session
    else:
        session["last_active"] = time.time()
    return session

def format_slot_prompt(slot_name: str) -> str:
    prompts = {
        "ask_days": "For how many days are you planning the trip?",
        "ask_destination": "Which place would you like to visit? (Bhopal, Ujjain, or nearby)",
        "ask_interests": "What are your interests? (culture, food, adventure, nature, spirituality)",
        "ask_timing": "Any timing preference? (morning/evening/weekend/any)"
    }
    return prompts.get(slot_name, "Tell me more about your trip.")

# ---- Routes ----

@app.get("/")
async def read_index():
    return fastapi.responses.FileResponse("static/index.html")

@app.post("/message")
async def message(payload: typing.Dict[str, typing.Any]):
    user_id = payload.get("user_id", "anonymous")
    message_text = payload.get("message", "").strip()
    print(message_text)
    if not message_text:
        return fastapi.responses.JSONResponse({"reply": "Please send a message."})

    session = get_session(user_id)
    state = session["state"]
    slots = session["slots"]
    session["history"].append({"from": "user", "text": message_text})

    # reset
    if message_text.lower() in ["reset", "restart", "start over"]:
        SESSIONS.pop(user_id, None)
        return fastapi.responses.JSONResponse({"reply": "Session reset. Hi! " + format_slot_prompt("ask_days")})

    # detect intent
    intent = detect_intent(message_text)

    # info query
    if intent == "info_query" and state != "ask_days":
        system, user_prompt = build_info_prompt(message_text)
        ai_reply = call_llm(system, user_prompt)
        session["history"].append({"from": "bot", "text": ai_reply})
        return fastapi.responses.JSONResponse({"reply": ai_reply})

    # --- slot filling flow ---
    if state == "ask_days":
        tokens = message_text.lower().split()
        days = None
        mapping = {"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7}
        for t in tokens:
            if t.isdigit(): days = int(t); break
            if t in mapping: days = mapping[t]; break
            if "weekend" in message_text: days = 2; break
        if not days:
            return fastapi.responses.JSONResponse({"reply": "How many days will your trip be? (e.g., '2 days' or 'weekend')"})
        slots["days"] = days
        session["state"] = "ask_destination"
        reply = f"Great — {days} day(s). Which destination would you like? (Bhopal, Ujjain or nearby)"
        session["history"].append({"from": "bot", "text": reply})
        return fastapi.responses.JSONResponse({"reply": reply})

    if state == "ask_destination":
        msg = message_text.lower()
        dest = None
        for candidate in KNOWLEDGE_BASE.keys():
            if candidate.lower() in msg: dest = candidate; break
        if not dest and "bhimbetka" in msg: dest = "Bhopal"
        if not dest and "pachmarhi" in msg: dest = "Bhopal"
        if not dest:
            return fastapi.responses.JSONResponse({"reply": "Please choose Bhopal, Ujjain or nearby (Bhimbetka, Pachmarhi)."})
        slots["destination"] = dest
        session["state"] = "ask_interests"
        reply = f"Nice — {dest}. What are your interests? (culture, food, adventure, nature, spirituality)"
        session["history"].append({"from": "bot", "text": reply})
        return fastapi.responses.JSONResponse({"reply": reply})

    if state == "ask_interests":
        msg = message_text.lower()
        possible = ["culture", "food", "adventure", "nature", "spirituality", "relaxation"]
        chosen = [p for p in possible if p in msg]
        if not chosen:
            return fastapi.responses.JSONResponse({"reply": "Tell me what you like: culture, food, adventure, nature, spirituality."})
        slots["interests"] = chosen
        session["state"] = "ask_timing"
        reply = "Do you have any timing preference? (morning/evening/weekend/any)"
        session["history"].append({"from": "bot", "text": reply})
        return fastapi.responses.JSONResponse({"reply": reply})

    if state == "ask_timing":
        msg = message_text.lower()
        timing = next((t for t in ["morning","evening","weekend","any","afternoon","night"] if t in msg), "any")
        slots["timing"] = timing
        system, user_prompt = build_itinerary_prompt(slots, "Generate itinerary")
        ai_reply = call_llm(system, user_prompt)
        session["state"] = "ready"
        session["history"].append({"from": "bot", "text": ai_reply})
        return fastapi.responses.JSONResponse({"reply": ai_reply})

    if session["state"] == "ready":
        if intent == "trip_plan":
            session["state"] = "ask_days"
            session["slots"] = {"days": None,"destination": None,"interests": None,"timing": None}
            reply = "Sure — let's create a new itinerary. " + format_slot_prompt("ask_days")
            session["history"].append({"from": "bot", "text": reply})
            return fastapi.responses.JSONResponse({"reply": reply})
        else:
            system, user_prompt = build_info_prompt(message_text)
            ai_reply = call_llm(system, user_prompt)
            session["history"].append({"from": "bot", "text": ai_reply})
            return fastapi.responses.JSONResponse({"reply": ai_reply})

    return fastapi.responses.JSONResponse({"reply": "Sorry, I didn't understand that."})

@app.post("/reset")
async def reset(payload: typing.Dict[str, typing.Any]):
    user_id = payload.get("user_id", "anonymous")
    SESSIONS.pop(user_id, None)
    return fastapi.responses.JSONResponse({"status": "ok", "message": "Session reset."})
