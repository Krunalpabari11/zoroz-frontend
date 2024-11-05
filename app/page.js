import React from 'react';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';

export default async function Page() {
  const res = await fetch('http://localhost:3000/api/products');
  const products = await res.json();

  return (
    <>
    <Navbar/>

    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-6">Featured Items</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
    </>
  );
}