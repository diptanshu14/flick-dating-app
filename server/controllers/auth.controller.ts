import { Request, Response } from "express";

export const test = async (req: Request, res: Response) => {
    res.json({ message: "Auth Test Route is working" })
}