import React, { useState, useEffect } from "react";
import { sendMessage, resetSession } from "../../api";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = localStorage.getItem("userId") || Date.now().toString();

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  const handleSend = async () => {
    if (!input) return;
    setMessages([...messages, { from: "user", text: input }]);
    const reply = await sendMessage(userId, input);
    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    setInput("");
  };

  const handleReset = async () => {
    const msg = await resetSession(userId);
    setMessages([{ from: "bot", text: msg }]);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
      <div className="h-60 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div key={i} className={`mb-1 text-${m.from === "user" ? "right" : "left"}`}>
            <span className={`inline-block px-2 py-1 rounded ${m.from === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button className="bg-blue-500 text-white px-3 rounded" onClick={handleSend}>
          Send
        </button>
        <button className="bg-red-500 text-white px-3 rounded" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Chat;
