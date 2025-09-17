// authUser.routes.js

import express from "express";
import {
    emailLogin,
  emailSignup,
  sendOtp,
  verifyOtp,
  googleLogin,
  logout,
  getProfile,
  editProfile
} from "../controllers/authUser.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/login", emailLogin);
router.post("/signup", emailSignup);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/google-login", googleLogin);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePicture"), editProfile);
export default router;