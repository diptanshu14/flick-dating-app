import { Request, Response } from "express"
import { getMatchesService, swipeLeftService, swipeRightService, getUsersService } from "../services/match.services"
import { UserDocument } from "../lib/types"

interface AuthenticateRequest extends Request {
    user?: UserDocument | null
}

export const swipeRight = async (req: AuthenticateRequest, res: Response) => {
    try {
        const { likedUserId } = req.params
        const user = await swipeRightService(req.user?.id, likedUserId)

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" })
            return
        }

        res.status(200).json({ success: true, user })
    } catch (error) {
        console.error("Error in swipeRight: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const swipeLeft = async (req: AuthenticateRequest, res: Response) => {
    try {
        const { dislikedUserId } = req.params
        const user = await swipeLeftService(req.user?.id, dislikedUserId)

        res.status(200).json({ success: true, user })
    } catch (error) {
        console.error("Error in swipeLeft: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const getMatches = async (req: AuthenticateRequest, res: Response) => {
    try {
        const user = await getMatchesService(req.user?.id)

        res.status(200).json({ success: true, matches: user.matches })
    } catch (error) {
        console.error("Error in getMatches: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const getUserProfiles = async (req: AuthenticateRequest, res: Response) => {
    try {
        const users = await getUsersService(req.user?.id)

        res.status(200).json({ success: true, users })
    } catch (error) {
        console.error("Error in getMatches: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}