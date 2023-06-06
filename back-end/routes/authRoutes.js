import express from 'express';
import cors from 'cors';
import { registerUser, test } from '../controllers/authController.js';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

router.get('/', test);
router.post('/register', registerUser);

export default router;
