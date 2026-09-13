import express from 'express';
import cors from 'cors';

import { pool } from './index.js';


const app = express();
app.use(express.json());



app.post('/api/signIn', async (req, res) => {
    const {username, password} = req.body;
    try {
        //if(typeof password === 'string') {
           //return res.status(401).send({message: 'Password must be a number'})
    //}

    req.session.username = username
    req.session.password = password

            const query = `INSERT INTO accounts (username, password) VALUES ($1, $2)`
            const values = [username, password]
            await pool.query(query, values)
            return res.status(201).json(req.session)
    } catch(err) {
        console.error(err)
        res.status(500).send({message: 'Internal error \n 500'})
    }
})


app.get('/api/profiles', async (req, res) => {
    try {
        const a = req.session
        if(1 === 1) {
            res.status(200).json(a)
        } else {
            res.status(401).send({message: 'Can not get user'})
        }
    } catch(err) {
        res.status(500).send({message: 'Internal error \n 500'})
    }
})