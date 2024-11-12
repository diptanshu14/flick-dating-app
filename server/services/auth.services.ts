import User from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signupService = async (
    name: string, email: string, password: string, age:number, gender: string, genderPreference: string
) => {
    const userExists = await User.findOne({ email })
    if (userExists) return { user: null, token: null } 

    const encryptPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: encryptPassword, age, gender, genderPreference })

    const userId = user._id
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
    })

    return { user, token }
}


export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email }).select("+password")
    if (!user) return { user: null, token: null }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return { user: null, token: null }

    const userId = user._id
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
    })

    return { user, token }
}