// pages/cancel.js
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Optionally, you can add some logic to handle the failed payment, e.g., update the order status
  }, []);

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
        <p className="text-lg mb-8">Something went wrong with your payment. Please try again.</p>
        <button
          onClick={handleBackToHome}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}