// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Config environment variables
let config = functions.config();

const stripe = require('stripe')(config.stripe.testsecret);
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.urlencoded({extended:false}));

const whitelist = [config.env.domain];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

const asyncCreateStripeLineItems = async (cartItems) => {
  try {
    let lineItems = [];

    await Promise.all(
      cartItems.map(async cartItem => {
        const productRef = admin.firestore().doc(`products/${cartItem.id}`);
        const productSnapshot = await productRef.get();
        const productData = productSnapshot.data();

        const priceForStripe = productData.price * 100; // cost in cents
        lineItems.push(
          {
            price_data: {
              currency: 'usd',
              unit_amount: priceForStripe,
              product_data: {
                name: productData.name,
              },
            },
            quantity: Math.max(0, cartItem.quantity),
          }
        );
      })
    );
    return lineItems;
  } catch(error) {
    console.log(error);
  }
};

app.post('/create-checkout-session', async (req, res) => {
  try {
    const userId = req.body.userId;

    const cartsSnapshot = await admin.firestore().collection(`users/${userId}/cart`).get();
    if(cartsSnapshot.empty) {
      throw 'No carts exist to checkout';
    }
    const cartRef = await cartsSnapshot.docs[0].ref.get();
    const cart = cartRef.data();
    const stripeLineItems = await asyncCreateStripeLineItems(cart.cartItems);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: stripeLineItems,
      mode: 'payment',
      success_url: `${config.env.domain}/checkout?success=true`,
      cancel_url: `${config.env.domain}/checkout?canceled=true`,
    });

    const newOrder = admin.firestore().collection(`users/${userId}/orders`).doc();
    newOrder.set({
      id: newOrder.id,
      uid: userId,
      cartId: cart.id,
      stripeSession: session,
      stripeLineItems: stripeLineItems,
      timestamp: Date.now(),
      orderComplete: false
    });

    res.redirect(303, session.url);
  } catch(error) {
    console.log(error);
  }
});

app.listen(5001, () => console.log('Running on port 5001'));
