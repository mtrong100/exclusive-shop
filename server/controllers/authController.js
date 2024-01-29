import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import { autoGeneratePassword, generateToken } from "../utils/hepler.js";
import { sendOtpToEmail } from "../services/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const isExistedUser = await User.findOne({ email: req.body.email });
    if (isExistedUser) {
      return next(errorHandler(400, "user is already exist"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    return res.status(201).json({ message: "create user sucessfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(errorHandler(404, "nout found"));
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return next(errorHandler(400, "wrong password"));
    }

    const token = await generateToken({ id: user._id, isAdmin: user.isAdmin });

    const {
      password: pass,
      resetPasswordOtp,
      resetPasswordExpires,
      ...rest
    } = user._doc;

    return res
      .status(201)
      .json({ message: "login user sucessfully", results: rest, token });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const generatedPassword = autoGeneratePassword();

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(generatedPassword, salt);

      const newUser = new User({
        ...req.body,
        password: hash,
      });

      await newUser.save();

      const token = await generateToken({
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      });

      const {
        password: pass,
        resetPasswordOtp,
        resetPasswordExpires,
        ...rest
      } = newUser._doc;

      return res
        .status(201)
        .json({ message: "create user sucessfully", results: rest, token });
    } else {
      const token = await generateToken({
        id: user._id,
        isAdmin: user.isAdmin,
      });

      const {
        password: pass,
        resetPasswordOtp,
        resetPasswordExpires,
        ...rest
      } = user._doc;

      return res.status(200).json({
        message: "login user sucessfully",
        results: rest,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, password, confirmPassword, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check user
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if OTP expired
    if (user.resetPasswordExpires < Date.now()) {
      return next(errorHandler(400, "OTP has expired"));
    }

    // Check if OTP not match
    if (user.resetPasswordOtp !== otp) {
      return next(errorHandler(400, "Invalid OTP"));
    }

    // Validate and update the password
    if (password !== confirmPassword) {
      return next(
        errorHandler(400, "Password and confirm password do not match")
      );
    }

    // Update password and reset OTP & expire time
    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordExpires = null;
    user.resetPasswordOtp = null;

    await user.save();
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });

    // Check user
    if (!user) {
      return next(errorHandler(404, "not found"));
    }

    // Generate OTP code and expire time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();
    await sendOtpToEmail(user.email, otp);

    return res
      .status(200)
      .json({ message: "OTP code has been sent to your email" });
  } catch (error) {
    next(error);
  }
};
