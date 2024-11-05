'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import React from 'react';

export default function ProductDetail({ params }) {
  const { id } = React.use(params);
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const offers = [
    "5% Unlimited Cashback on Flipkart Axis Bank Credit Card",
    "Flat ₹1,200 off on HDFC Bank Credit Card EMI Txns on 6 and 9 months tenure, Min. Txn Value: ₹15,000",
    "Flat ₹1,500 off on HDFC Bank Credit Card EMI Txns on 12 months tenure, Min. Txn Value: ₹15,000",
    "10% off up to ₹1750 on HDFC Bank Credit Card EMI Txns on 24 months tenure, Min. Txn Value: ₹15,000",
    "View 6 more offers",
  ];

  const warrantyInfo =
    "1 Year of Warranty provided by the manufacturer from the date of purchase (RTB). For any assistance give a call at 70651-79991/2/3/4/5 or Write us at - support@egate-world.com";

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="p-6 flex">
        {/* Left Side: Image */}
        <div className="flex-none w-2/5 mr-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center mt-2 text-yellow-400">
            {/* Displaying 4.5 out of 5 stars as an example */}
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-5 w-5 ${index < 4 ? 'fill-current' : 'text-gray-400'}`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.121-6.5L1 6.58l6.58-.96L10 0l2.42 5.62L19 6.58l-4.243 4.91 1.121 6.5z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-medium">4.5</span>
          </div>
          <p className="text-2xl font-bold mt-4">${product.price}</p>
          <p className="mt-4">{product.description}</p>

          <button
  onClick={() => router.push(`/checkout?id=${id}`)} // Pass the product id in the query string
  className="mt-4 bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors"
>
  Buy Now
</button>


          {/* Offers and Warranty Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Available Offers</h2>
            <ul className="mt-2">
              {offers.map((offer, index) => (
                <li key={index} className="mt-1 text-gray-300">
                  <strong>Bank Offer:</strong> {offer}
                </li>
              ))}
            </ul>
            <h2 className="text-xl font-bold mt-6">Warranty</h2>
            <p className="mt-2 text-gray-300">{warrantyInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}