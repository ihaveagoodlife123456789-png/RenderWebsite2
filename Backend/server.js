import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './index.js';

import session from 'express-session'
import pgSession from 'connect-pg-simple'

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { authLoginRouter } from './serverRequests/authLogin.js'
import { authLogoutRouter } from './serverRequests/authLogout.js'
import { AuthProfile } from './serverRequests/profile.js'
import { display } from './serverRequests/display.js'
import { createPost } from './serverRequests/createPost.js'
import { authSignIn } from './serverRequests/authSignIn.js'

const app = express();
app.use(cors({ origin: 'https://ascendedhorizons.com', credentials: true }));
app.use(express.json());


//Frontend paths

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Cookies

const PostgresStore = pgSession(session)

app.use(
    session({
        store: new PostgresStore({
            pool: pool,
            tableName: 'session',
            createTableIfMissing: true
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
            maxAge: 1000 * 60 * 3
        }
    })
);


//Authentication

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const searchUser = `SELECT * FROM authenticate WHERE id = $1`
        const { rows } = await pool.query(searchUser, [id])
        if(rows.length === 0) {
           return done(null, false);
        }
        done(null, rows[0])
    } catch (err) {
        done(err)
    }
});

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const searchUser = `SELECT * FROM authenticate WHERE username = $1`
            const { rows } = await pool.query(searchUser, [username])

            if(rows.length === 0) {
                return done(null, false, { message: 'Incorrect username.'})
            }
            const userPassword = rows[0].password
            if(userPassword !== password) {
                return done(null, false, { message: 'Incorrect password.'})
            }
            return done(null, rows[0])
        } catch (err) {
            return done(err)
        }
    }
));


//Module paths

app.use('/api/auth/login', authLoginRouter)
app.use('/api/auth/logout', authLogoutRouter)
app.use('/api/auth/signIn', authSignIn)
app.use('/api/profile', AuthProfile)
app.use('/api/users', display)
app.use('/api/create', createPost)


//Frontend renders

const distPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
});

app.get('/api/profile', (req, res) => {
    console.log(req.session)
})