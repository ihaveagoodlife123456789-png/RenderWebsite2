import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './index.js';

import session from 'express-session'
import pgSession from 'connect-pg-simple'

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import bcrypt from 'bcrypt';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';

import { authLoginRouter } from './serverRequests/authLogin.js'
import { authLogoutRouter } from './serverRequests/authLogout.js'
import { AuthProfile } from './serverRequests/profile.js'
import { display } from './serverRequests/display.js'
import { createPost } from './serverRequests/createPost.js'
import { authSignIn } from './serverRequests/authSignIn.js'
import { authGoogle } from './googleAuth.js'

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
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        name: 'some_cookies',
        cookie: {
            domain: 'ascendedhorizons.com',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 15
        }
    })
);


//Authentication

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async (id, done) => {
    try {
        const searchUser = `SELECT * FROM authenticate WHERE id = $1`
        const { rows } = await pool.query(searchUser, [id.id])
        if(rows.length === 0) {
           return done(null, false);
        }
        done(null, rows[0])
    } catch (err) {
        done(err)
    }
});

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://ascendedhorizons.com/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('=== GOOGLE AUTH START ===')
            console.log('Profile:', JSON.stringify(profile, null, 2))

            if (!profile.emails || profile.emails.length === 0) {
                console.error('No email from Google profile')
                return done(new Error('No email from Google'))
            }

            const googleId = profile.id
            const email = profile.emails[0].value

            console.log('Searching for user with google_id:', googleId)

            const searchUser = `SELECT * FROM authenticate WHERE google_id = $1`
            const { rows } = await pool.query(searchUser, [googleId])

            if (rows.length > 0) {
                console.log('User found, returning:', rows[0].id)
                return done(null, rows[0])
            }

            console.log('User not found, creating new user')

            const createUser = `
                INSERT INTO authenticate (google_id, username, email) 
                VALUES ($1, $2, $3) 
                RETURNING *
            `
            const newUser = await pool.query(createUser, [googleId, email, email])
            
            console.log('New user created:', newUser.rows[0].id)
            return done(null, newUser.rows[0])

        } catch (err) {
            console.error('=== GOOGLE AUTH ERROR ===')
            console.error('Error message:', err.message)
            console.error('Error stack:', err.stack)
            return done(err)
        }
    }
))

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const searchUser = `SELECT * FROM authenticate WHERE username = $1`
            const { rows } = await pool.query(searchUser, [username.toLowerCase()])

            if(rows.length === 0) {
                return done(null, false, { message: 'Incorrect username.'})
            }
            const isValid = await bcrypt.compare(password, rows[0].password)

            if(!isValid) {
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
app.use('/auth/google', authGoogle)


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