import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import * as S from './checkout.styles';

const CheckoutPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  
  const uid = currentUser ? currentUser.id : '';
  
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Stripe Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setStatusMessage('Order placed!');
    } else if (query.get('canceled')) {
      setStatusMessage("Order canceled - continue to shop around and checkout when you're ready.");
    }
  }, []);

  return (
    <S.CheckoutPageContainer>
      { statusMessage ?
          <S.CheckoutStatusContainer>
            { statusMessage }
          </S.CheckoutStatusContainer>
        : null
      }

      <S.CheckoutHeaderContainer>
        <S.HeaderBlockContainer>
          <span>Product</span>
        </S.HeaderBlockContainer>
        <S.HeaderBlockContainer>
          <span>Description</span>
        </S.HeaderBlockContainer>
        <S.HeaderBlockContainer>
          <span>Quantity</span>
        </S.HeaderBlockContainer>
        <S.HeaderBlockContainer>
          <span>Price</span>
        </S.HeaderBlockContainer>
        <S.HeaderBlockContainer>
          <span>Remove</span>
        </S.HeaderBlockContainer>
      </S.CheckoutHeaderContainer>
      {
        cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      }
      <S.TotalContainer>TOTAL: ${cartTotal}</S.TotalContainer>
      <S.WarningContainer>
        *Please use the following test credit card for payments*
        <br/>
        4242 4242 4242 4242 -  Exp: 01/24 - CVV: 123
      </S.WarningContainer>

      <form action={`${process.env.REACT_APP_POST_DOMAIN}/create-checkout-session`} method='POST'>
        <input type="hidden" name="userId" value={uid} />
        <button type="submit">Checkout</button>
      </form>
    </S.CheckoutPageContainer>
  );
};

export default CheckoutPage;