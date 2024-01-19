import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const verifyAdmin = (req, res, next) => {
  const tokenHeader = req.headers.token;
  if (!tokenHeader) {
    return next(errorHandler(401, "Unauthorized: Token missing"));
  }

  // Split the token from the "Bearer" text
  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, user) {
    if (err) {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }

    const { isAdmin } = user;
    if (isAdmin) {
      next();
    } else {
      return next(errorHandler(403, "Forbidden: Insufficient permissions"));
    }
  });
};
