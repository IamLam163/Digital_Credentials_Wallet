import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/authRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
const port = 7000;

// database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to Database')
  })
  .catch((err) => {
    console.log('Database connection failed!', err.toString())
  })

// Set CORS headers
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', router);


// server connection
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`));
