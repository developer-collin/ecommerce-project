import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';

import { toggleCartHidden } from '../../redux/cart/cart.slice';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
  CartDropdownButton
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector(selectCartItems);

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {
          cartItems.length ? (
            cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
          )
        }
      </CartItemsContainer>
      <CartDropdownButton
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}>
          GO TO CHECKOUT
      </CartDropdownButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;