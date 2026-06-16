import express from "express";
import {
	getResources,
	getResource,
	createResource,
	updateResource,
	deleteResource,
	toggleFavorite,
	incrementVisit,
	archiveResource,
} from "../controllers/resourceController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Apply auth middleware to all routes below
router.use(protect);

// /api/resources
router.route("/").get(getResources).post(createResource);

// /api/resources/:id
router
	.route("/:id")
	.get(getResource)
	.put(updateResource)
	.delete(deleteResource);

// /api/resources/:id/favorite
router.patch("/:id/favorite", toggleFavorite);

// /api/resources/:id/visit
router.patch("/:id/visit", incrementVisit);

// /api/resources/:id/archive
router.patch("/:id/archive", archiveResource);

export default router;
