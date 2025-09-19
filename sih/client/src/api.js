import axios from "axios";

const API_URL = "http://localhost:8000"; // your backend

// Send user message to backend
export const sendMessage = async (userId, message) => {
  try {
    const res = await axios.post(`${API_URL}/message`, { user_id: userId, message });
    return res.data.reply;
  } catch (err) {
    console.error(err);
    return "Error connecting to server.";
  }
};

// Reset chat session
export const resetSession = async (userId) => {
  try {
    const res = await axios.post(`${API_URL}/reset`, { user_id: userId });
    return res.data.message;
  } catch (err) {
    console.error(err);
    return "Error resetting session.";
  }
};
