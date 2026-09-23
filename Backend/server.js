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

import cookieParser from 'cookie-parser'

import { authLoginRouter } from './serverRequests/authLogin.js'
import { authLogoutRouter } from './serverRequests/authLogout.js'
import { AuthProfile } from './serverRequests/profile.js'
import { display } from './serverRequests/display.js'
import { createPost } from './serverRequests/createPost.js'
import { authSignIn } from './serverRequests/authSignIn.js'
import { authGoogle } from './googleAuth.js'
import { stripePayment } from './stripe.js'

import crypto from 'crypto'
import validator from 'validator'

import helmet from 'helmet'

import nodemailer from 'nodemailer';

const app = express();
app.use(cors({ origin: 'https://ascendedhorizons.com', credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(helmet())


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

//DDos Prevention
/*export const createPostLimiter = rateLimit({
    windowMs: 1000 * 25,
    max: 5
})*/

//XSS Prevention
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'")
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    next()
})

//CSRF Prevention
app.use((req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }
  next();
});


app.get('/api/csrf-token', (req, res) => {
  res.json({ token: req.session.csrfToken });
});


//SQL Injection prevention

/*validator.isEmail(email)                          // Check valid email
validator.isLength(str, { min, max })             // Check length
validator.matches(str, regex)                     // Match pattern
validator.isAlphanumeric(str)                     // Only letters/numbers
validator.isStrongPassword(password)              // Check password strength
validator.trim(str)                               // Remove whitespace
validator.escape(str)                             // HTML escape (XSS prevention)
validator.normalizeEmail(email)                   // Normalize email
validator.isMobilePhone(phone, locale)            // Validate phone
validator.isURL(url)                              // Validate URL
validator.isInt(str)                           // Check if integer*/


//Authentication

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const searchUser = `SELECT * FROM authenticate WHERE id = $1`
        const searchUserGoogle = `SELECT * FROM authenticateGoogle WHERE id = $1`

        const { rows: rowsGoogle } = await pool.query(searchUserGoogle, [id])

        if(rowsGoogle.length > 0) {
            return done(null, rowsGoogle[0])
        }

        const { rows } = await pool.query(searchUser, [id])

        if(rows.length > 0) {
            return done(null, rows[0])
        }
    
        return done(null, false);
    } catch (err) {
        done(err)
    }
});

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

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://ascendedhorizons.com/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
       try {
            console.log('User info from Google:', profile)

        const googleId = profile.id
        const email = profile.emails[0].value
        const username = profile.displayName
        const photo = profile.photos[0].value

        if (!validator.isEmail(email)) {
            return done(new Error('Invalid email from Google'))
        }

        const searchUser = `SELECT * FROM authenticateGoogle WHERE google_id = $1`
        const { rows } = await pool.query(searchUser, [googleId])

        if (rows.length > 0) {
            return done(null, rows[0])
        }

        const createUser = `
        INSERT INTO authenticateGoogle (google_id, username, email, photo)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `

        const newUser = await pool.query(createUser, [googleId, username, email, photo])


        return done(null, newUser.rows[0])
    } catch (err){
        console.error('Google auth error:', err.message)
        return done(err)
    }
    }
))

//Nodemailer

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "username",
        pass: "password"
    }
})

const message = {
    from: "sender@server.com",
  to: "receiver@example.com",
  subject: "Hello World",
  text: "This is the plaintext version of the email.",
  html: "<p>This is the <strong>HTML version</strong> of the email.</p>",
}


//Module paths

app.use('/api/auth/login', authLoginRouter) 
app.use('/api/auth/logout', authLogoutRouter)
app.use('/api/auth/signIn', authSignIn)
app.use('/api/profile', AuthProfile)
app.use('/api/users', display)
app.use('/api/create', createPost)
app.use('/auth/google', authGoogle)
app.use('/auth/stripe', stripePayment)


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
