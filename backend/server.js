import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './database/db.js';
import userRoute from './routers/user.router.js';
import errorHandler from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});


// Define a simple route
app.use('/api/user', userRoute);
// Global error handling middleware
app.use(errorHandler);
