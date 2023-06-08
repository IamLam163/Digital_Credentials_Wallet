import express from 'express';
import cors from 'cors';
import { forgotPassword, getProfile, loginUser, registerUser, test, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.get('/profile', getProfile);

export default router;
