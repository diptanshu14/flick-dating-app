import express from "express"
import dotnev from "dotenv"

import connectDB from "./lib/database"
import routes from "./routes/routes" 
import cookieParser from "cookie-parser"

dotnev.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDB()
})
