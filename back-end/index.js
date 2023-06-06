import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/authRoutes.js';
import mongoose from 'mongoose';

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


//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
Access - Control - Allow - Origin; 'http://localhost:3000';
Access - Control - Allow - Credentials; true;

//routes
app.use('/', router);


// server connection
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`));
