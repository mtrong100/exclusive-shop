import Category from "../models/categoryModel.js";
import { queryParams } from "../utils/constants.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getCategories = async (req, res, next) => {
  try {
    const {
      page = queryParams.PAGE,
      limit = queryParams.LIMIT,
      order = queryParams.ORDER,
      query,
    } = req.query;

    const filter = {};

    if (query) {
      filter.name = new RegExp(query, "i");
    }

    const options = {
      page,
      limit,
      sort: {
        createdAt: order === "asc" ? 1 : -1,
      },
    };

    const data = await Category.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "Not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();

    return res
      .status(201)
      .json({ message: "Create category sucessfully", results: newCategory });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res
      .status(200)
      .json({ message: "Update category sucessfully", results: data });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Category.findByIdAndDelete(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "Category has been deleted" });
  } catch (error) {
    next(error);
  }
};
