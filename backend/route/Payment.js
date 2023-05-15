const express = require('express');
const Stripe = require('stripe');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {
  console.log(req.body.cartItems)
  const line_items = req.body.cartItems.cartItems.map((item) => {
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
   
  });
  
// Calculate the total amount
const total = line_items.reduce((acc, item) => acc + item.price_data.unit_amount * item.quantity, 0);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
console.log(session)
    res.json({ url: session.url,total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session' });
  }
});

module.exports = router;
