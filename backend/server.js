import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import Stripe from "stripe";

// app config
const app = express()
const port = process.env.PORT || 4000

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// middlewares
app.use(express.json())
app.use(cors())

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
