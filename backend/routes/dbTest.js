import express from 'express';
import pool from '../db.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // 현재 시간 조회
    res.json({
      message: '✅ Supabase DB 연결 성공!',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('❌ DB 연결 실패:', error);
    res.status(500).json({ message: 'DB 연결 실패', error: error.message });
  }
});

export default router;
