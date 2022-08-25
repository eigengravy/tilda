import express from "express";
import { getUser, getUserById } from "../controllers/users.js";

const router = express.Router();

router.get("/find/:name", getUser);
router.get("/findById/:id", getUserById);

export default router;
