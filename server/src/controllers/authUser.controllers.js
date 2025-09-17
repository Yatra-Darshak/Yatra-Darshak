// authUser.controllers.js

import User from "../models/authUser.models.js";
import OtpStore from "../models/otp.models.js";
import axios from "axios";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
// import Post from "../models/post.models.js";

/* -------------------- EMAIL LOGIN -------------------- */
export const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use let because we reassign `user` later
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found. Please signup first." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password/credentials entered." });
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);


    // Make mapping safe if user.posts is undefined
    const populatedPosts = await Promise.all(
      (user.posts || []).map(async (postId) => {
        const post = await Post.findById(postId);
        if (post && post.author && post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );

    // remove nulls
    const postsFiltered = populatedPosts.filter(Boolean);

    // Overwrite safely (now user is a plain object for response)
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      posts: postsFiltered,
    };

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

/* -------------------- EMAIL SIGNUP -------------------- */
export const emailSignup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    if (!password || password !== confirmPassword) {
      return res.status(500).json({ success: false, message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      loginMethod: "default",
    });

    await newUser.save();

    const token = jsonwebtoken.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(201).json({ success: true, message: "User registered successfully", token, user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/* -------------------- SEND OTP -------------------- */
export const sendOtp = async (req, res) => {
  try {
    const { phonenumber } = req.body;

    if (!phonenumber || phonenumber.length !== 10 || !/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({ success: false, message: "Invalid phone number" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await OtpStore.create({
      phonenumber,
      otp: hashedOtp,
      createdAt: Date.now(),
    });

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Your OTP is ${otp}`,
        language: "english",
        numbers: [phonenumber],
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Fast2SMS response:", response.data);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ OTP send error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.response?.data || error.message,
    });
  }
};

/* -------------------- VERIFY OTP -------------------- */
export const verifyOtp = async (req, res) => {
  try {
    const { phonenumber, otp, fullname } = req.body;

    const record = await OtpStore.findOne({ phonenumber }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (Date.now() - record.createdAt > 5 * 60 * 1000) {
      await OtpStore.deleteMany({ phonenumber });
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp.toString(), record.otp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    await OtpStore.deleteMany({ phonenumber });

    let user = await User.findOne({ phonenumber });
    if (!user) {
      user = new User({
        fullname: fullname || "Anonymous User",
        phonenumber,
        loginMethod: "phone",
      });
      await user.save();
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying OTP",
      error: error.message,
    });
  }
};

/* -------------------- GOOGLE LOGIN -------------------- */
export const googleLogin = async (req, res) => {
  try {
    const { fullname, email, googleId } = req.body;

    // find by googleId or by email and link, or create new
    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        user.googleId = googleId;
        user.loginMethod = "google";
        await user.save();
      } else {
        user = new User({ fullname, email, googleId, loginMethod: "google" });
        await user.save();
      }
    }

    const populatedPosts = await Promise.all(
      (user.posts || []).map(async (postId) => {
        const post = await Post.findById(postId);
        if (post && post.author && post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );

    const postsFiltered = populatedPosts.filter(Boolean);

    // prepare user object for response
    const responseUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      posts: postsFiltered,
    };

    // Generate token
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ success: true, message: "Google login successful", token, user: responseUser });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* -------------------- LOGOUT -------------------- */
export const logout = async (_, res) => {
  try {
    return res
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error during logout", error: error.message });
  }
};

/* -------------------- GET PROFILE -------------------- */
export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate({
        path: "posts",
        options: { sort: { createdAt: -1 } }, // correct sorting usage
      })
      .populate("bookmarks")
      .select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Server error while fetching profile", error: error.message });
  }
};

/* -------------------- EDIT PROFILE -------------------- */
export const editProfile = async (req, res) => {
  try {
    // Accept different possible locations for user id (depending on your auth middleware)
    const userId = req.id || req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: user id missing" });
    }

    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;

    console.log("userId:", userId);
    console.log("bio:", bio);
    console.log("profile picture:", !!profilePicture);

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      // getDataUri might return an object or string depending on your util; adjust if needed
      // e.g., if getDataUri returns { content }, use fileUri.content
      const uploadArg = typeof fileUri === "string" ? fileUri : fileUri.content || fileUri.base64 || fileUri;
      cloudResponse = await cloudinary.uploader.upload(uploadArg);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture && cloudResponse?.secure_url) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({ success: true, message: "Profile updated.", user });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).json({ success: false, message: "Server error while updating profile", error: error.message });
  }
};
