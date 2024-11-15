import mongoose from "mongoose"
import { MessageDocument } from "../lib/types"

const messageSchema = new mongoose.Schema<MessageDocument>({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema)

export default Message