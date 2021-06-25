import { memo } from 'react';

import {
  CartItemContainer,
  CartItemImage,
  ItemDetailsContainer
} from './cart-item.styles';

const CartItem = ({ item: { imageFilename, price, name, quantity } }) => {
  const imageUrl = require(`../../assets/shop/${imageFilename}`).default;

  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt='Item' />
      <ItemDetailsContainer>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetailsContainer>
    </CartItemContainer>
  );
};

export default memo(CartItem);
