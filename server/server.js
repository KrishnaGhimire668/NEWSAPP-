import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors'; 
import connectDB from './db/connect.js';
import authRoutes from './routes/auth.routes.js';
import newsRoutes from './routes/news.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running: ${PORT}`);
});
