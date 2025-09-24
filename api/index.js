import express from 'express';
import connectDB from './v1/config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import v1Routes from './v1/index.js';
import { notFoundMiddleware } from './v1/middlewares/notFound.middleware.js';
import { errorMiddleware } from './v1/middlewares/error.middleware.js';
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

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});

export default app;