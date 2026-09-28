
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode'

import validator from 'validator'

const app = express();
app.use(cors());
app.use(express.json());

export const authGoogle = express.Router()

authGoogle.get('/login',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

authGoogle.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login-failed'}),
    (req, res) => {
        console.log('User logged in:', req.user)

        let photo = req.user.photo

        if (photo && !validator.isURL(photo, { require_protocol: true })) {
            photo = null
        }

        const token = jwt.sign(
            { userId: req.user.google_id, username: req.user.username, email: req.user.email, photo: photo },
            process.env.JWT_SECRET,
            { expiresIn: '15min'}
        )

        res.cookie('token', token, {
          httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'  
        })

        res.redirect(`https://ascendedhorizons.com/`)
    }
)

