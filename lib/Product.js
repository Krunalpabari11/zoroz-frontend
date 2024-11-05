// /lib/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL or path to the product image
    required: true,
  },
  ratings: {
    type: Number,
    default: 0, // Default rating
    min: 0,
    max: 5, // Assuming a rating scale of 0 to 5
  },
  numReviews: {
    type: Number,
    default: 0, // Default number of reviews
  },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
