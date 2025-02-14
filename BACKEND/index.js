import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from "./config/mongoDb.js"
import connectCloundinary from "./config/cloundinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT
connectDB()
connectCloundinary()

app.use(express.json())
app.use(cors())

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.listen(PORT,()=>{
console.log(`SERVER AT STARTED PORT NUMBER ${PORT}`)
})