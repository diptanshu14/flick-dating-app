import express from "express"
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"
import matchRoutes from "./match.routes"
import messageRoutes from "./message.routes"

const router = express.Router()

router.use("/api/auth", authRoutes)
router.use("/api/users", userRoutes)
router.use("/api/matches", matchRoutes)
router.use("/api/messages", messageRoutes)

export default router