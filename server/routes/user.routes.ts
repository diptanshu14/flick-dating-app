import express from "express"
import { authenticate } from "../middlewares/auth.middleware"
import { updateProfile } from "../controllers/user.controller"

const router = express.Router()

router.put("/update", authenticate, updateProfile)

export default router