// // src/utils/api.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: "/api/auth", // handled by proxy
//   withCredentials: true, // for cookies/jwt
// });

// // Auth APIs
// export const login = (data) => API.post("/login", data);
// export const signup = (data) => API.post("/signup", data);
// export const sendOtp = (data) => API.post("/send-otp", data);
// export const verifyOtp = (data) => API.post("/verify-otp", data);
// export const googleLogin = (data) => API.post("/google-login", data);


import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // 👈 must match backend prefix
    withCredentials: true, // for cookies/jwt
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const sendOtp = (data) => API.post("/auth/send-otp", data);
export const verifyOtp = (data) => API.post("/auth/verify-otp", data);
