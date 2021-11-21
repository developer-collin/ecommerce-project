import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';

import { toggleCartHidden } from '../../redux/cart/cart.slice';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import * as S from './cart-dropdown.styles';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  return (
    <S.CartDropdownContainer>
      <S.CartItemsContainer>
        {
          cartItems.length ? (
            cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <S.EmptyMessageContainer>Your cart is empty</S.EmptyMessageContainer>
          )
        }
      </S.CartItemsContainer>
      <S.CartDropdownButton
        onClick={() => {
          navigate('/checkout');
          dispatch(toggleCartHidden());
        }}>
          GO TO CHECKOUT
      </S.CartDropdownButton>
    </S.CartDropdownContainer>
  );
};

export default CartDropdown;