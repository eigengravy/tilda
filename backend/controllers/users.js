import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ name: req.params.name });
    if (!foundUser) return next(createError(404, "User not found"));
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) return next(createError(404, "User not found"));
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};
