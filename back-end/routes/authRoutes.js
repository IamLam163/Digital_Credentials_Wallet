import express from 'express';
import cors from 'cors';
import { forgotPassword, getProfile, loginUser, logoutUser, registerUser, resetPassword, test, verifyEmail } from '../controllers/authController.js';
import { isResetTokenValid } from '../helpers/auth.js';

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
router.get('/logout', logoutUser);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', isResetTokenValid, resetPassword);
router.get('/profile', getProfile);

export default router;
