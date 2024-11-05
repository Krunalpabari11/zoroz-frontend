// /app/api/products/[id]/route.js
import dbConnect from '../../.././../lib/mongodb';
import Product from '../../../../lib/Product';

export async function GET(req, { params }) {
  const product = await getProductById(params.id);
  if (!product) {
    return new Response('Product not found', { status: 404 });
  }

  return new Response(JSON.stringify(product), { status: 200 });

}

export async function getProductById(id) {
  await dbConnect();

  const product = await Product.findById(id)

  return product;
}
