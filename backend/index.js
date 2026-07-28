import express from 'express';
import dotenv from 'dotenv';
//ab hum en variables access kr skte hain process.env k through
//isko upr likha kro taki jldi load ho
dotenv.config();
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import dns from 'dns';
import userRouter from './routes/user.routes.js';
import itemRouter from "./routes/item.routes.js"
import shopRouter from "./routes/shop.routes.js"
import orderRouter from './routes/order.routes.js';

// change dns
dns.setServers(['8.8.8.8', '8.8.4.4']);

//express package k andr jitne v cheezein hain wo hm app k through access kr skte hain  
const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    // kon konse frontend se request allowed hai
    origin: 'http://localhost:5173',
    // cookies ko allow krne k liye
    credentials: true,
}))
//global middleware jo hr routes k liye
// jo v data frontend se ayega wo json me convert krenge otherwise undefined aayega req.body me jo v data aayega
app.use(express.json());
// token easily cookies me store krne k liye cookie parser use krenge
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop",shopRouter)
app.use("/api/item",itemRouter)
app.use("/api/order",orderRouter)

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});