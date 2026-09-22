import express from 'express'
import { pool } from '../index.js';

export const createPost = express.Router()//res.json({ token: req.session.csrfToken });
//import { validateCsrf } from '../server.js'

export const validateCsrf = (req, res, next) => {
  const token = req.body._csrf || req.headers['x-csrf-token'];
  if (token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'CSRF validation failed' });
  }
};

createPost.post('/', validateCsrf, async (req, res) => {
    const { name, message, color, email } = req.body

    try {
        const query = `SELECT id FROM users ORDER BY id DESC LIMIT 1`
        const result = await pool.query(query)
        const newId = result.rows[0].id + 1

        const insertQuery = 'INSERT INTO users(id, name, message, color, email) VALUES ($1, $2, $3, $4, $5) RETURNING *'
        const values = [ newId, name, message, color, email ]
        await pool.query(insertQuery, values)
        return res.status(201).send({ message: 'Recieved!'})
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error \n 500'})
    }
})