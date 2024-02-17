import User from "../models/userModel.js";
import { queryParams } from "../utils/constants.js";
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

export const getAllUsers = async (req, res, next) => {
  const {
    page = queryParams.PAGE,
    limit = queryParams.LIMIT,
    sort = queryParams.SORT,
    order = queryParams.ORDER,
    query,
  } = req.query;

  try {
    const filter = {};

    if (query) {
      filter.name = new RegExp(query, "i");
    }

    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
    };

    const data = await User.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await User.findByIdAndDelete(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};
