import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:  true
}))
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes requires middleware now since we have seperate file for router if using in controller file then just app.get used
app.use("/users", userRouter)
export{app}