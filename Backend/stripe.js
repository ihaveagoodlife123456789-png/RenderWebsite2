import Stripe from 'stripe';
import express from 'express';

export const stripe = express.Router()
const stripe = new Stripe(STRIPE_SECRET_KEY)

stripe.get('/', async (req, res) => {
    const paymentMethod = await stripe.paymentMethods.create({
    amount: 250,
    currency: 'cad'
})
res.json({client_secret: paymentMethod.client_secret})
})