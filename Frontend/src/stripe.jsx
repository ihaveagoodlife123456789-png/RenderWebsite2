import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import Stripe from 'stripe';
import {ElementsProvider, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useState, useEffect } from 'react'


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


export function PaymentPage() {
    const [clientSecret, setClientSecret] = useState(null)
    useEffect(() => {
        async function fetchClientSecretfunc() {
            const fetchClientSecret = await fetch('/auth/stripe')
            if(!fetchClientSecret) {
                setClientSecret(null)
                return;
            }
            const { getClientSecret } = fetchClientSecret.json()
            console.log(getClientSecret)
            setClientSecret(getClientSecret)
        }
        fetchClientSecretfunc()
    })
    return (
  <Elements stripe={stripePromise} options={{clientSecret}}>
    <form>
      <PaymentElement />
      <button type="submit">Pay now</button>
    </form>
  </Elements>
    )
}
