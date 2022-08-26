import Gist from "../models/Gist.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const addGist = async (req, res, next) => {
  const gist = new Gist({ userId: req.user.id, ...req.body });
  try {
    const savedGist = await gist.save();
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        gists: savedGist._id,
      },
    });
    res.status(200).json(savedGist);
  } catch (err) {
    next(err);
  }
};

export const updateGist = async (req, res, next) => {
  try {
    const gist = await Gist.findById(req.params.id);
    if (!gist) return next(createError(404, "Gist not found"));
    if (req.user.id === gist.userId) {
      const updatedGist = await Gist.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedGist);
    } else {
      return next(createError(403, "You can only update your gist"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteGist = async (req, res, next) => {
  try {
    const gist = await Gist.findById(req.params.id);
    if (!gist) return next(createError(404, "Gist not found"));
    if (req.user.id === gist.userId) {
      await Gist.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted the gist");
    } else {
      return next(createError(403, "You can only delete your gist"));
    }
  } catch (err) {
    next(err);
  }
};

export const getGist = async (req, res, next) => {
  try {
    const gist = await Gist.findById(req.params.id);
    if (!gist) return next(createError(404, "Gist not found"));
    if (gist.public) {
      res.status(200).json(gist);
    } else {
      const token = req.cookies.access_token;
      if (token) {
        jwt.verify(token, process.env.JWT, (err, user) => {
          if (!err) {
            if (user.id === gist.userId) {
              res.status(200).json(gist);
            }
          }
        });
      }
      return next(createError(404, "Gist not found"));
    }
  } catch (err) {
    next(err);
  }
};

export const latestGists = async (req, res, next) => {
  try {
    const gist = await Gist.find({ public: true })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(gist);
  } catch (err) {
    next(err);
  }
};

export const getGistsByUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ name: req.params.name });
    if (!foundUser) return next(createError(404, "User not found"));

    let isOwner = false;
    const token = req.cookies.access_token;
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT, (err, user) => {
        if (!err) {
          if (user.id === foundUser._id.toString()) {
            isOwner = true;
          }
        }
      });
    }

    const gists = await Promise.all(
      foundUser.gists.map(async (gist) => {
        const gistRes = await Gist.findById(gist);
        return gistRes;
      })
    );

    res.status(200).json(
      gists.filter((gist) => {
        return isOwner || gist.public;
      })
    );
  } catch (err) {
    next(err);
  }
};
