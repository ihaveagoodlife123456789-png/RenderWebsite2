import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './index.js';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

