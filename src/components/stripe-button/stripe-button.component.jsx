import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  // Stripe takes price in cents
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IhifpIIIfJXmn9X2997C9BrkkjU5GJp1rCrbjZUk7qDjaRdp0dbCTROcrfOqoJcfHQqNi4mCXQmQqUuaNh9RRq100dPzWifFc';

  const onToken = token => {
    console.log(token);
    alert('Payment successful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='E-commerce Project'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;