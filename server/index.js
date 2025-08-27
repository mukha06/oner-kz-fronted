import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

import authRoutes from './routes/auth.js';
import worksRoutes from './routes/works.js';

app.use('/api/auth', authRoutes);
app.use('/api/works', worksRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server started on 5000')))
  .catch(err => console.error(err));
