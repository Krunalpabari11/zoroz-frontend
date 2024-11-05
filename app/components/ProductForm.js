// components/ProductForm.js
'use client'
import { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [ratings, setRatings] = useState('');
  const [numReviews, setNumReviews] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          image,
          ratings: Number(ratings),
          numReviews: Number(numReviews),
        }),
      });

      if (response.ok) {
        setMessage('Product created successfully!');
        setName('');
        setDescription('');
        setPrice('');
        setImage('');
        setRatings('');
        setNumReviews('');
      } else {
        setMessage('Failed to create product. Please try again.');
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server.');
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-8  shadow-lg rounded-lg border border-gray-200">
      {message && (
        <div className={`p-4 mb-4 text-sm ${message.startsWith('Product') ? 'text-green-800 bg-green-200 border border-green-400' : 'text-red-800 bg-red-200 border border-red-400'} rounded`}>
          <strong>{message.startsWith('Product') ? 'Success!' : 'Error!'}</strong> {message}
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-2"
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium text-gray-700">Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-2"
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={e => setImage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-2"
          />
        </div>

        <div>
          <label htmlFor="ratings" className="block font-medium text-gray-700">Ratings (0-5)</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            id="ratings"
            value={ratings}
            onChange={e => setRatings(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-2"
          />
        </div>

        <div>
          <label htmlFor="numReviews" className="block font-medium text-gray-700">Number of Reviews</label>
          <input
            type="number"
            min="0"
            id="numReviews"
            value={numReviews}
            onChange={e => setNumReviews(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm 
                      ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};
 
export default ProductForm;