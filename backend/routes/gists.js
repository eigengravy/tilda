import express from "express";

import {
  addGist,
  deleteGist,
  getGist,
  latestGists,
  updateGist,
} from "../controllers/gist.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addGist);
router.put("/:id", verifyToken, updateGist);
router.delete("/:id", verifyToken, deleteGist);
router.get("/find/:id", getGist);
router.get("/latest", latestGists);

export default router;
