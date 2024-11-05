'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import { loadStripe } from '@stripe/stripe-js';

export default function Checkout() {
  const getStripe = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    return stripe;
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);

  const productId = searchParams.get('id');

  useEffect(() => {
    console.log(productId + ' working');
    if (productId) {
      const fetchProduct = async () => {
        const res = await fetch(`http://localhost:3000/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      };
      fetchProduct();
    }
  }, [productId]);

  const handlePayment = async () => {
    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: product._id, quantity }),
    });

    if (res.ok) {
      const { id } = await res.json();
      const stripe = await getStripe(); // Uncomment this if using Stripe
      await stripe.redirectToCheckout({ sessionId: id });
      setPaymentSuccess(true);
    } else {
      setError('Payment failed');
    }
  };

  if (!product) return <div>Loading...</div>; // Loading state while fetching

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="p-6 md:p-10 lg:p-16 flex justify-center">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 lg:p-10 w-full max-w-xl">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <div className="flex items-center mb-6">
            <img src={product.image} alt={product.name} className="h-24 w-24 object-cover rounded-lg" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-lg font-medium text-gray-400">${(product.price * quantity).toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-700 p-2 rounded-l hover:bg-gray-600 transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-700 p-2 rounded-r hover:bg-gray-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded transition-colors"
          >
            Pay Now
          </button>
          {paymentSuccess && (
            <p className="text-green-500 font-medium mt-4">Payment Successful!</p>
          )}
          {error && (
            <p className="text-red-500 font-medium mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
} 