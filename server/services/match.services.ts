import User from "../models/user.model"
import { UserDocument } from "../lib/types"

export const swipeRightService = async (currentUserId: any, likedUserId: any) => {
    const currentUser = await User.findById(currentUserId) as UserDocument
    const likedUser = await User.findById(likedUserId) as UserDocument

    if (!likedUser) return null

    if (!currentUser.likes.includes(likedUserId)) {
        currentUser.likes.push(likedUserId)
        await currentUser.save()

        if (likedUser.likes.includes(currentUserId)) {
            currentUser.matches.push(likedUserId)
            likedUser.matches.push(currentUserId)

            await Promise.all([currentUser.save(), likedUser.save()])
        }
    }

    return currentUser
}


export const swipeLeftService = async (currentUserId: any, dislikedUserId: any) => {
    const currentUser = await User.findById(currentUserId) as UserDocument

    if (!currentUser.dislikes.includes(dislikedUserId)) {
        currentUser.dislikes.push(dislikedUserId)
        await currentUser.save()
    }

    return currentUser
}


export const getMatchesService = async (userId: string) => {
    return await User.findById(userId).populate("matches", "name image") as UserDocument
}


export const getUsersService = async (userId: string) => {
    const currentUser = await User.findById(userId) as UserDocument

    return await User.find({
        $and: [
            { _id: { $ne: currentUser.id } },
            { _id: { $nin: currentUser.likes } },
            { _id: { $nin: currentUser.dislikes } },
            { _id: { $nin: currentUser.matches } },
            {
                gender:
                    currentUser.genderPreference === "both"
                        ? { $in: ["male", "female"] }
                        : currentUser.genderPreference,
            },
            { genderPreference: { $in: [currentUser.gender, "both"] } },
        ],
    }) as UserDocument[]
}