import express from 'express';
import cors from 'cors';
import router from '../controllers/pdfController.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/pdf', router);

export default router;