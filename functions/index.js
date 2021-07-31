const functions = require('firebase-functions');
const config = functions.config();
const admin = require('firebase-admin');

// Reminder: Firebase local emulator pulls from config from .runtimeconfig.json
// https://firebase.google.com/docs/functions/local-emulator
const webhookEndpointSecret = config.stripe.webhook.secret;

const stripe = require('stripe')(config.stripe.testsecret);
const cors = require('cors');
const express = require('express');

admin.initializeApp();

const app = express();

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({extended: true}));

const whitelist = [config.env.domain];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS`))
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
      throw new Error('No carts exist to checkout');
    }
    const cartRef = await cartsSnapshot.docs[0].ref.get();
    const cart = cartRef.data();
    const stripeLineItems = await asyncCreateStripeLineItems(cart.cartItems);
    const session = await stripe.checkout.sessions.create({
      client_reference_id: userId,
      payment_method_types: ['card'],
      line_items: stripeLineItems,
      mode: 'payment',
      success_url: `${config.env.domain}/checkout?success=true`,
      cancel_url: `${config.env.domain}/checkout?canceled=true`,
    });

    const newOrder = admin.firestore().collection(`users/${userId}/orders`).doc(session.id);
    newOrder.set({
      uid: userId,
      cart: cart,
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

const fulfillOrder = session => {
  const userId = session.client_reference_id;
  const order = admin.firestore().doc(`users/${userId}/orders/${session.id}`);
  order.update({
    orderComplete: true,
    stripeSession: session
  });
};

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookEndpointSecret);
  } catch (err) {
    console.log('EVENT WEBHOOKS ERROR', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      fulfillOrder(session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).end();
});

app.listen(5001, () => console.log('Running on port 5001'));
