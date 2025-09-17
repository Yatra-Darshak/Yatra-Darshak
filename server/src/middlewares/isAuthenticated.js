import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Attach user id to request
    req.id = decoded.id; // note: 'id' because you signed token with { id: user._id }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export default isAuthenticated;
