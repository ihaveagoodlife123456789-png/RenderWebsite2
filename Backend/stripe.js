import Stripe from 'stripe';
import express from 'express';
import { ClientSecrets } from 'openai/resources/realtime/client-secrets.js';

export const stripePayment = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


stripePayment.get('/', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
    amount: 250,
    currency: 'usd'
})
console.log(paymentIntent)
res.json({client_secret: paymentIntent.client_secret})
})

stripePayment.post('/update', async (req, res) => {
    const paymentUpdate = await stripe.paymentIntents.update(
        `{{${stripe.paymentIntents.id}}`,
        {
            amount: paymentIntents.amount + 100
        }
    )
    console.log(paymentUpdate)
    res.json({client_amount: paymentUpdate.amount})
})

stripePayment.get('/retrieve', async (req, res) => {
    const paymentRetrieve = await stripe.paymentIntents.retrieve(
        `{{${stripe.paymentIntents.id}}`
    )
    res.json({client_amount: paymentRetrieve.amount})
})

stripePayment.post('/cancel', async (req, res) => {
    const paymentRetrieve = await stripe.paymentIntents.cancel(
        `{{${stripe.paymentIntents.id}}`
    )
    res.json({client_status: 'Cancelled'})
})

stripePayment.post('/confirm', async (req, res) => {
    const paymentConfirm = await stripe.paymentIntents.confirm(
        `{{${stripe.paymentIntents.id}}`,
        {
          payment_method: paymentMethod.id,
        }
    )
    res.json({client_status: paymentConfirm.status, client_payment_method: paymentConfirm.payment_method})
})

//PaymentMethod

stripePayment.post('/paymentMethod', async (req, res) => {
    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: null
    })
    console.log(paymentMethod)
    res.json({client_status: 'Ready'})
})

//Payment Elements

