import { asyncTryCatch } from "../middleware/asyncTryCatch.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const orderProducts = asyncTryCatch(async (req, res, next) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.imageUrl],
      },

      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.totalQuantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_DOMAIN}/cart`,
    cancel_url: `${process.env.CLIENT_DOMAIN}/cancel`,
  });

  res.status(200).json({ id: session.id });
});
