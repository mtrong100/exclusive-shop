import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { queryParams } from "../utils/constants.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getAllProducts = async (req, res, next) => {
  const {
    page = queryParams.PAGE,
    limit = queryParams.LIMIT,
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
        createdAt: order === "asc" ? 1 : -1,
      },
    };

    const data = await Product.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  const {
    page = queryParams.PAGE,
    limit = queryParams.LIMIT,
    order = queryParams.ORDER,
    query,
  } = req.query;

  const { category } = req.params;

  try {
    const filter = { category };

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

    const data = await Product.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "Not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getProductDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Create product sucessfully", results: newProduct });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res
      .status(200)
      .json({ message: "Update product sucessfully", results: data });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Product.findByIdAndDelete(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "Product has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const favoriteProduct = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Toggle follow
    if (currentUser.favorites.includes(id)) {
      currentUser.favorites = currentUser.favorites.filter(
        (item) => item !== id
      );

      await currentUser.save();
      return res.json({ message: "Unfavorite product" });
    } else {
      currentUser.favorites.push(id);
      await currentUser.save();
      return res.json({ message: "Favorite product" });
    }
  } catch (error) {
    next(error);
  }
};
