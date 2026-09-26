import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm'; // Import your form component

// EXCLUSIVELY use your Publishable Key here (pk_test_...)
const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

export function PaymentPage() {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchClientSecretFunc() {
      try {
        const response = await fetch('/auth/stripe');
        if (!response.ok) throw new Error('Network response failed');
        
        const data = await response.json();
        setClientSecret(data.client_secret);
      } catch (err) {
        console.error("Failed to fetch intent:", err);
        setError(true);
      }
    }
    fetchClientSecretFunc();
  }, []);

  if (error) {
    return <div className='bg-red-300 p-4 text-red-800'>Failed to load checkout session.</div>;
  }

  if (!clientSecret) {
    return <div className='bg-gray-100 p-4'>Loading checkout setup...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
