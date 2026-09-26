import { Link } from 'react-router-dom'

import Stripe from 'stripe';
import { PaymentElement } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'


const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);


export function PaymentPage() {
    const [clientSecret, setClientSecret] = useState(null)
    useEffect(() => {
        async function fetchClientSecretfunc() {
            const fetchClientSecret = await fetch('/auth/stripe')
            if(!fetchClientSecret) {
                setClientSecret(null)
                return;
            }
            const { getClientSecret } = await fetchClientSecret.json()
            console.log(getClientSecret)
            setClientSecret(getClientSecret)
        }
        fetchClientSecretfunc()
    }, [])

    if(!clientSecret) {
        return (
            <div className='bg-red-300'>
                Loading...
            </div>
        )
    }
    return (
  <Elements stripe={stripePromise} options={{clientSecret}}>
    <form>
      <PaymentElement />
      <button type="submit">Pay now</button>
    </form>
  </Elements>
    )
}
