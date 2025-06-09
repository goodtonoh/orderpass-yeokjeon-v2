import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import visitRoutes from './routes/visitRoutes.js';
import dbTestRouter from './routes/dbTest.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/db-test', dbTestRouter);

app.use('/api', visitRoutes); // 👉 http://your-server.com/api/track-visit

app.get('/', (req, res) => res.send('✅ Express Backend is running'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
