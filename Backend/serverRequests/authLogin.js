import express from 'express';

import passport from 'passport';

export const authLoginRouter = express.Router()

authLoginRouter.post('/', passport.authenticate("local", { failureRedirect: '/login' }), (req, res) => {
    res.json({ message: 'Logged in Successfully'})
})