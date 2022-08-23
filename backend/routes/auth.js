import express from "express";
import { githubAuth, googleAuth, signin, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.post("/github", githubAuth);

export default router;
