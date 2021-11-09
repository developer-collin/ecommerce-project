import { useSelector, useDispatch } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.slice';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import {
  CartIconContainer,
  ShoppingIcon,
  ItemCountContainer
} from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemsCount);

  return (
    <CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
  );
};

export default CartIcon;
