import { memo } from 'react';

import { getShopImageUrl } from '../utils/images';

import * as S from './cart-item.styles';

const CartItem = ({ item: { imageFilename, price, name, quantity } }) => {
  const imageUrl = getShopImageUrl(imageFilename);

  return (
    <S.CartItemContainer>
      <S.CartItemImage src={imageUrl} alt='Item' />
      <S.ItemDetailsContainer>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </S.ItemDetailsContainer>
    </S.CartItemContainer>
  );
};

export default memo(CartItem);
