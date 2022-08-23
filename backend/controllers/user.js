import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ name: req.params.name });
    if (!foundUser) return next(createError(404, "User not found"));

    const token = req.cookies.access_token;
    if (token) {
      jwt.verify(token, process.env.JWT, (err, user) => {
        if (!err) {
          if (user.id === foundUser._id) {
            res.status(200).json(foundUser);
          }
        }
      });
    }

    foundUser.gists.filter((gist) => gist.public);
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};
