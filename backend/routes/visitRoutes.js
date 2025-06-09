import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/track-visit', async (req, res) => {
  try {
    const visitDate = new Date();
    await pool.query('INSERT INTO visits (visit_date) VALUES ($1)', [visitDate]);
    res.status(200).json({ message: 'Visit tracked' });
  } catch (err) {
    console.error('Error tracking visit:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// /api/visit-stats
router.get('/visit-stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        to_char(visit_date AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') AS date,
        COUNT(*) AS count
      FROM visits
      GROUP BY date
      ORDER BY date DESC
      LIMIT 7
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
