import { memo } from 'react';

import { getShopImageUrl } from '../utils/images';

import {
  CartItemContainer,
  CartItemImage,
  ItemDetailsContainer
} from './cart-item.styles';

const CartItem = ({ item: { imageFilename, price, name, quantity } }) => {
  const imageUrl = getShopImageUrl(imageFilename);

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
