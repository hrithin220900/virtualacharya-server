import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello World!")
})

app.use("/api/auth", authRoute)

dotenv.config()

mongoose.set('strictQuery', true);
const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB")
    }).catch((err) => {
        throw err;
    })
}

app.listen(8800, () => {
    connect()
    console.log("Server running on Port 8800")
})