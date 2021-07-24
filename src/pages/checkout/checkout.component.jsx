import { useState, useEffect } from "react";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer,
  CheckoutStatusContainer
} from './checkout.styles';

const CheckoutPage = ({ currentUser, cartItems, cartTotal }) => {
  const uid = currentUser ? currentUser.id : ''
  
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Stripe Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setStatusMessage('Order placed! You will receive an email confirmation.');
    } else if (query.get('canceled')) {
      setStatusMessage("Order canceled - continue to shop around and checkout when you're ready.");
    }
  }, []);

  return (
    <CheckoutPageContainer>
      { statusMessage ?
          <CheckoutStatusContainer>
            { statusMessage }
          </CheckoutStatusContainer>
        : null
      }

      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {
        cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      }
      <TotalContainer>TOTAL: ${cartTotal}</TotalContainer>
      <WarningContainer>
        *Please use the following test credit card for payments*
        <br/>
        4242 4242 4242 4242 -  Exp: 01/24 - CVV: 123
      </WarningContainer>

      <form action={`${process.env.REACT_APP_POST_DOMAIN}/create-checkout-session`} method='POST'>
        <input type="hidden" name="userId" value={uid} />
        <button type="submit">Checkout</button>
      </form>
    </CheckoutPageContainer>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);