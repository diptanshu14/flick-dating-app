import express from "express"
import { getMe, login, logout, signup } from "../controllers/auth.controller"
import { authenticate } from "../middlewares/auth.middleware"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", authenticate, getMe )

export default router