import { useSelector, useDispatch } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.slice';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import * as S from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemsCount);

  return (
    <S.CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
      <S.ShoppingIcon />
      <S.ItemCountContainer>{itemCount}</S.ItemCountContainer>
    </S.CartIconContainer>
  );
};

export default CartIcon;
