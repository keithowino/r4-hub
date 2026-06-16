import express from "express";
import {
	register,
	login,
	getMe,
	updateMe,
	changePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

router.use(protect);

// Private routes
router.get("/me", getMe);
router.put("/me", updateMe);
router.put("/password", changePassword);

export default router;
