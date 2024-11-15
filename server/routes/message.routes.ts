import express from "express"
import { getConversation, sendMessage } from "../controllers/message.controller"
import { authenticate } from "../middlewares/auth.middleware"

const router = express.Router()

router.post("/send", authenticate, sendMessage)
router.get("/conversation/:userId", authenticate, getConversation)

export default router