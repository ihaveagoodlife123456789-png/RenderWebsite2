import express from 'express';

import passport from 'passport';

export const authLogoutRouter = express.Router()

authLogoutRouter.post('/', (req, res) => {
    if(!req.user) return res.redirect('/')
    req.logout((err) => {
       if(err) return res.status(401)
        return res.redirect("/")
    })
})