import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

const normalizeOrigin = (origin) => {
  if (!origin) {
    return ""
  }

  try {
    return new URL(origin.trim()).origin
  } catch (error) {
    return origin.trim().replace(/\/$/, "")
  }
}

const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [])
].map(normalizeOrigin).filter(Boolean)

// middlewares
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const requestOrigin = normalizeOrigin(origin)
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(requestOrigin)) {
      return callback(null, true)
    }
    return callback(new Error("Not allowed by CORS"))
  },
  credentials: true
}))

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

const startServer = async () => {
  try {
    await connectDB()
    app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
  } catch (error) {
    console.error("Failed to start server due to DB connection error.")
    process.exit(1)
  }
}

startServer()
