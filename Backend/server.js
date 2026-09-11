import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './index.js';

import session from 'express-session'
import pgSession from 'connect-pg-simple'

const app = express();
app.use(cors({
    origin: 'https://ascendedhorizons.com',
    credentials: true
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PostgresStore = pgSession(session)

app.use(
    session({
        store: new PostgresStore({
            pool: pool,
            tableName: 'session'
        }),
        secret: 'AXoawusxaqw',
        resave: false,
        saveUninitialized: false,
        name: 'some_cookies',
        cookie: {
            domain: 'ascendedhorizons.com',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 5
        }
    })
);

const userData = {
    username: '1',
    password: '4',
}

app.post('/api/signIn', async (req, res) => {
    const {username, password} = req.body;
    try {
       // if(!username || !password) {
           // return res.status(401).send({message: 'Connot be null'})
    //}

    req.session.username = username
    req.session.password = password

            const query = `INSERT INTO accounts (user_id, messages, name) VALUES ($1, $2, $3)`
            const values = [1, username, password]
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

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: '500 \n Internal server error'})
    }
})

app.post('/api/users', async (req, res) => {
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

const distPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
});

