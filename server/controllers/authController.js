import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import { autoGeneratePassword } from "../utils/hepler.js";

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;

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

      return res.status(201).json({ message: "create user sucessfully" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

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
