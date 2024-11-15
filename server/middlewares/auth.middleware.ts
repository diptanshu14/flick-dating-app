import { NextFunction, Request, Response } from "express"
import { UserDocument } from "../lib/types"
import jwt from "jsonwebtoken"
import User from "../models/user.model"

interface AuthenticateRequest extends Request {
    user?: UserDocument | null
}

export const authenticate = async (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt 
        if (!token) {
            res.status(401).json({ success: false, message: "Not Authorized - No token provided" })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
        if (!decoded) {
            res.status(401).json({ success: false, message: "Not Authorized - Invalid token" })
            return
        }

        const currentUser = await User.findById(decoded.userId)
        if (!currentUser) {
            res.status(401).json({ success: false, message: "Not authorized - User not found" })
            return
        }

        req.user = currentUser
        next()
    } catch (error) {
        console.error("Error in auth middleware: ", error)

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ success: false, message: "Not authorized - Invalid token" })
        } else {
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
}