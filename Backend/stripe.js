import Stripe from 'stripe';
import express from 'express';

export const stripe = express.Router()
const stripeKEY = new Stripe(STRIPE_SECRET_KEY)

stripe.get('/', async (req, res) => {
    const paymentMethod = await stripeKEY.paymentMethods.create({
    amount: 250,
    currency: 'cad'
})
res.json({client_secret: paymentMethod.client_secret})
})