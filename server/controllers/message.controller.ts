import { Request, Response } from "express"
import { UserDocument } from "../lib/types"
import { conversationService, messageService } from "../services/message.services"

interface AuthenticateRequest extends Request {
    user?: UserDocument | null
}

export const sendMessage = async (req: AuthenticateRequest, res: Response) => {
    try {
        const { content, receiverId } = req.body
        const senderId = req.user?.id

        const newMessage = await messageService(senderId, content, receiverId)

        res.status(201).json({ success: true, message: newMessage })
    } catch (error) {
        console.log("Error in send message controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const getConversation = async (req: AuthenticateRequest, res: Response) => {
    try {
        const { userId } = req.params
        const currentUserId = req.user?.id

        const messages = await conversationService(currentUserId, userId)

        res.status(200).json({ success: true, messages })
    } catch (error) {
        console.log("Error in get conversation controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}