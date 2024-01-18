import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.token;
  if (!tokenHeader) {
    return next(errorHandler(401, "Unauthorized: Token missing"));
  }

  // Split the token from the "Bearer" text
  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }

    next();
  });
};
