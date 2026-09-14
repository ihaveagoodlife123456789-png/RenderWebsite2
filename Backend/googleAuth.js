
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

const app = express();
app.use(cors());
app.use(express.json());

export const authGoogle = express.Router()

authGoogle.get('/',
    passport.authenticate('google', { failureRedirect: '/login-failed'},
        (req, res) => {
            console.log('User logged in:', req.user);

            const token = jwt.sign(
                {userId: req.user.id, email: req.user.email},
                process.env.JWT_SECRET,
                { expiresIn: '1d'}
            );

            res.redirect(`https://ascendedhorizons.com/profile?token=${token}`)
        }
    )
)

