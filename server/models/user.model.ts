import mongoose from "mongoose"
import { UserDocument } from "../lib/types"

const userSchema = new mongoose.Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    genderPreference: { type: String, required: true, enum: ["male", "female", "both"] },
    bio: { type: String, default: "" },
    image: { type: String, default: "" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })

const User = mongoose.model<UserDocument>("User", userSchema)

export default User