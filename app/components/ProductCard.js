// /components/ProductCard.js

import Link from 'next/link';


export default function ProductCard({ product }) {
  
  return (
    <div className="bg-gray-700 p-4 rounded-lg w-64 h-96 flex flex-col justify-between mt-4">
      <div className="h-full overflow-hidden rounded mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full  object-cover" 
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-300 mb-2 line-clamp-3">{product.description}</p>
      <p className="font-bold mb-4">${product.price}</p>
      <Link href={`/product/${product._id}`}>
        <button className="bg-blue-600 p-2 rounded w-full">View Product</button>
      </Link>
    </div>
  );
}
