import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import v1Routes from './index.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import rateLimit from 'express-rate-limit';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 100, 
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    handler: (req, res) => {
        res.status(429).json({ error: "Too many requests, please try again later." });
    }
});

app.use(limiter);

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', v1Routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;