// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Config environment variables
let config = functions.config();

const stripe = require('stripe')(config.stripe.testsecret);
const express = require('express');
const app = express();
app.use(express.static('.'));

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// const createLineItems = () => {
//   admin.firestore().collection('products')
// }

app.post('/create-checkout-session', async (req, res) => {
  console.log('POST TEST', 'POST TEST2', 'POST TEST3');
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${config.env.domain}/checkout?success=true`,
    cancel_url: `${config.env.domain}/checkout?canceled=true`,
  });

  res.redirect(303, session.url)
});

app.listen(5001, () => console.log('Running on port 5001'));