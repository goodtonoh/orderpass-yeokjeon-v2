import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import visitRoutes from './routes/visitRoutes.js';
import dbTestRouter from './routes/dbTest.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://menu-yeokjeon-v2.vercel.app",
}));

app.use('/api/db-test', dbTestRouter);

app.use('/api', visitRoutes); // 👉 http://my-server.com/api/track-visit

app.get('/', (req, res) => res.send('✅ Orderpass Express is running!'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
