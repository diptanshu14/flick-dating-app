import mongoose, { Document } from "mongoose"

export type UserType = {
    name: string
    email: string
    password: string
    age: number
    gender: "male" | "female"
    genderPreference: "male" | "female" | "both"
    bio?: string
    image?: string
    likes: mongoose.Schema.Types.ObjectId[],
    dislikes: mongoose.Schema.Types.ObjectId[],
    matches: mongoose.Schema.Types.ObjectId[]
}

export type UserDocument = UserType & Document

export type MessageType = {
    sender: mongoose.Schema.Types.ObjectId,
    receiver: mongoose.Schema.Types.ObjectId,
    content: string
}

export type MessageDocument = MessageType & Document