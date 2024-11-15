import express from "express"
import { authenticate } from "../middlewares/auth.middleware"
import { getMe, updateProfile } from "../controllers/user.controller"

const router = express.Router()

router.get("/me", authenticate, getMe)
router.put("/update", authenticate, updateProfile)

export default router