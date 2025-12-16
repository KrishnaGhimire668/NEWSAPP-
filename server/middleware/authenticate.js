import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    // ✅ token contains { id: userId }
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    const rootUser = await User.findById(decoded.id).select("-password");

    if (!rootUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.rootUser = rootUser;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authenticate;
