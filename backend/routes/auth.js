import express from "express";
import { githubAuth, googleAuth, signin, signup, signout } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.post("/github", githubAuth);
router.post("/signout", verifyToken, signout)

export default router;
