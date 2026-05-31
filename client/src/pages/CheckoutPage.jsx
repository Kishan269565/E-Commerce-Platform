import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function CheckoutForm() {
  const stripe      = useStripe();
  const elements    = useElements();
  const { cart, total, clearCart } = useCart();
  const navigate    = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Create payment intent on backend
    const { data } = await api.post('/payments/create-intent', {
      amount: Math.round(total * 100),
    });

    // 2. Confirm payment with Stripe
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      // 3. Create order in DB
      await api.post('/orders', {
        items: cart.map(i => ({
          product:  i._id,
          name:     i.name,
          price:    i.price,
          quantity: i.quantity,
          image:    i.image,
        })),
        totalPrice: total,
        paymentResult: {
          id:     result.paymentIntent.id,
          status: result.paymentIntent.status,
        },
      });

      clearCart();
      navigate('/order-success');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Total: ${total.toFixed(2)}</h2>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}