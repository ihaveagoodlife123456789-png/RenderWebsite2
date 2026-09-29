import Stripe from 'stripe';
import express from 'express';
 
export const stripePayment = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const domain = await stripe.paymentMethodDomains.create({
  domain_name: 'ascendedhorizons.com', // lowercase, no https://, no path
});
console.log(domain.id, domain.apple_pay.status);

stripePayment.get('/', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'cad'
})
console.log(paymentIntent)
res.json({
    id: paymentIntent.id,
    client_secret: paymentIntent.client_secret
})
})

stripePayment.post('/update', async (req, res) => {
    try {
        const { paymentIntentId, newAmount  } = req.body
        const paymentUpdate = await stripe.paymentIntents.update(
            paymentIntentId,
            { amount: newAmount }
        )
        console.log(paymentUpdate)
    res.json({client_amount: paymentUpdate.amount})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

stripePayment.post('/retrieve', async (req, res) => {
    try {
        const { paymentIntentId } = req.body
        const paymentRetrieve = await stripe.paymentIntents.retrieve(paymentIntentId);
        res.json({ client_amount: paymentRetrieve.amount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 4. Cancel a Payment Intent
stripePayment.post('/cancel', async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        await stripe.paymentIntents.cancel(paymentIntentId);
        res.json({ client_status: 'Cancelled' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 5. Confirm a Payment Intent
stripePayment.post('/confirm', async (req, res) => {
    try {
        const { paymentIntentId, paymentMethodId } = req.body;
        
        const paymentConfirm = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
        });
        
        res.json({
            client_status: paymentConfirm.status,
            client_payment_method: paymentConfirm.payment_method
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Payment Elements
//payment_intent.succeeded

/*
import { PaymentElement, AddressElement } from '@stripe/react-stripe-js';

<form onSubmit={handleSubmit}>
  <AddressElement options={{ mode: 'shipping', allowedCountries: ['CA', 'US'] }} />
  <PaymentElement options={{ layout: 'accordion' }} />
  <button type="submit">Pay now</button>
</form>
*/
