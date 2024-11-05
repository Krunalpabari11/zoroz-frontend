// /app/api/products/route.js
import dbConnect from '../../../lib/mongodb';
import Product from '../../../lib/Product';

export async function GET(req) {
  await dbConnect();
  
  const products = await Product.find({});
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  await dbConnect();

  // Parse the request body as JSON
  const { name, description, price, image, ratings, numReviews } = await req.json();

  console.log({ name, description, price, image, ratings, numReviews }); 

  const newProduct = new Product({
    name,
    description,
    price,
    image,
    ratings,
    numReviews,
  });

  await newProduct.save();

  return new Response(JSON.stringify(newProduct), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
