import express from "express"
import { authenticate } from "../middlewares/auth.middleware"
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from "../controllers/match.controller"

const router = express.Router()

router.post("/swipe-right/:likedUserId", authenticate, swipeRight)
router.post("/swipe-left/:dislikedUserId", authenticate, swipeLeft)
router.get("/", authenticate, getMatches)
router.get("/user-profiles", authenticate, getUserProfiles)

export default router