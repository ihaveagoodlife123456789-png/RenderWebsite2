import express from 'express';
import { pool } from '../index.js';

import passport from 'passport';

export const authSignIn  = express.Router()

authSignIn.post('/', async (req, res) => {
    const {username, password, email} = req.body
    try {
        const verify = `SELECT * FROM authenticate WHERE email = $1`
        const verifyEmail = await pool.query(verify, [email.toLowerCase()])
        if(verifyEmail.rows.length === 1) {
            return res.status(401).json({message: 'A user with this email already exists.'})
        }
        const query = `INSERT INTO authenticate (username, password, email) VALUES ($1, $2, $3)`
        const values = [username.toLowerCase(), password, email.toLowerCase()]
        const result = await pool.query(query, values)
        return res.status(201).json(result)
    } catch (err) {
        res.status(201).json({message: err.message})
    }
})