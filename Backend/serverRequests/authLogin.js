import express from 'express';

import passport from 'passport';

export const authLoginRouter = express.Router()

authLoginRouter.post('/', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.status(401).json({ message: info.message})
        }

        req.logIn(user, (err) => {
            if (err) {
                return(err);
            }
            return res.json({ message: 'Logged in Successfully', user: user})
        })
    })(req, res, next)
})

