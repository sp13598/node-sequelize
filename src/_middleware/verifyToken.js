import jwt from "jsonwebtoken";
import { statusCode } from "../utils/statusCode.js";

export const verifyOwner = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res
      .status(statusCode.UNAUTHORIZED)
      .json({ message: "You are not authorized.." });
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err)
      return res
        .status(statusCode.FORBIDDEN)
        .json({ message: "Token is not valid", err });
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyOwner(req, res, () => {
    const userRole = req.user.role;
    if (userRole && userRole.toLowerCase() === "admin") return next();
    return res
      .status(statusCode.FORBIDDEN)
      .json({ message: "You are not Authorized!" });
  });
};
