import Message from "../models/message.model"

export const messageService = async (senderId: any, content: string, receiverId: any) => {
    const newMessage = await Message.create({
        sender: senderId,
        receiver: receiverId,
        content: content
    })

    return newMessage
}


export const conversationService = async (currentUserId: any, otherUserId: any) => {
    return await Message.find({
        $or: [
            { sender: currentUserId, receiver: otherUserId },
            { sender: otherUserId, receiver: currentUserId },
        ]
    }).sort("createdAt")
}