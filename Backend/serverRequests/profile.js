import express from 'express';

import passport from 'passport';

export const AuthProfile = express.Router()

AuthProfile.get('/', (req, res) => {
    if(!req.user) {
        return res.status(401).json({ message: 'Please login first'})
    }
    console.log(req.user)
    return res.status(200).json(req.user)
})