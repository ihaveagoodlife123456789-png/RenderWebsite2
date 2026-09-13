import express from 'express';

import passport from 'passport';

export const authLogoutRouter = express.Router()

authLogoutRouter.post('/', (req, res, next) => {
    if(!req.user) return res.status(500).json({ message: 'Could not log out, please try again' });
    req.logout((err) => {
       if(err) return next(err)

        req.session.destroy((err) => {
        if(err) {
            return res.status(500).json({ message: 'Could not log out, please try again' });
        }
        res.clearCookie('some_cookies')
       return res.status(200).json({ message: 'Logged out successfully' });
    })
    })
})