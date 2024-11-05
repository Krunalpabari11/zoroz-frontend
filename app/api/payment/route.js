// pages/api/payment.js
import Stripe from 'stripe';
import { getProductById } from '../products/[id]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // Use the latest version you need
});

export async function POST(request) {
  const { productId, quantity } = await request.json();
  const product = await getProductById(productId);
  if (!product) {
    return new Response('Product not found', { status: 404 });
  }

  try {
    const origin = request.headers.get('origin');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: product.image.length > 0 ? [product.image] : [],
            },
            unit_amount: Math.round(product.price*100), // Update based on the product price
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/failure`,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}