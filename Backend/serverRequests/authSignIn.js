import express from 'express';
import { pool } from '../index.js';

import bcrypt from 'bcrypt';

//import { createPostLimiter } from '../server.js'

import validator from 'validator'
import { rateLimit } from 'express-rate-limit'

export const authSignIn  = express.Router()

export const createPostLimiter = rateLimit({
    windowMs: 1000 * 25,
    max: 5
})

authSignIn.post('/', createPostLimiter,  async (req, res) => {
    const {username, password, email} = req.body
    try {

        username = validator.trim(username)
        email = validator.trim(email).toLowerCase()

        if (!validator.isLength(username, { min: 5, max: 12,})) {
            return res.status(401).json({message: 'Password must be between 5 and 12 caracters'})
        }

        if (!validator.matches(username, /^[A-Za-z0-9]+$/)) {
            return res.status(401).json({message: 'Username can only contain letters, numbers, underscore, hyphen'})
        }

        /*if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' })
        }*/

        const isStrongPassword = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
})

       if (!isStrongPassword) {
        return res.status(401).json({message: 'Password needs uppercase, lowercase, number, symbol'})
       }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const verify = `SELECT * FROM authenticate WHERE email = $1`
        const verifyEmail = await pool.query(verify, [email.toLowerCase()])
        if(verifyEmail.rows.length === 1) {
            return res.status(401).json({message: 'A user with this email already exists.'})
        }
        const query = `INSERT INTO authenticate (username, password, email) VALUES ($1, $2, $3)`
        const values = [username.toLowerCase(), hashedPassword, email.toLowerCase()]
        const result = await pool.query(query, values)
        return res.status(201).json(result)
    } catch (err) {
        res.status(201).json({message: 'Server error'})
    }
})