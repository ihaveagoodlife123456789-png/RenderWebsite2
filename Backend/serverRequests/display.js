import express from 'express';
import { pool } from '../index.js';

export const display = express.Router()


display.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: '500 \n Internal server error'})
    }
})