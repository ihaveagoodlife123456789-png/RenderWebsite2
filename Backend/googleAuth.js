
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode'

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

        const token = jwt.sign(
            { userId: req.user.google_id, username: req.user.username, email: req.user.email },
            process.env.JWT_SECRET,
            { expiresIn: '15min'}
        )

        res.redirect(`https://ascendedhorizons.com/?token=${token}`)
    }
)

