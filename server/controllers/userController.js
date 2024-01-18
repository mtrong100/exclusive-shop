import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getUserDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await User.findById(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    const { password, resetPasswordOtp, resetPasswordExpires, ...rest } =
      data._doc;

    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    const { password, resetPasswordOtp, resetPasswordExpires, ...rest } =
      data._doc;

    return res.status(200).json({ message: "user updated", results: rest });
  } catch (error) {
    next(error);
  }
};
