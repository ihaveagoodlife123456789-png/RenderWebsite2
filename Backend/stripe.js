import Stripe from 'stripe';
import express from 'express';

export const stripePayment = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

stripePayment.get('/', async (req, res) => {
    const paymentMethod = await stripe.paymentIntents.create({
    amount: 250,
    currency: 'usd'
})
console.log(paymentMethod)
res.json({client_secret: paymentMethod.client_secret})
})