import { useDispatch } from 'react-redux';

import { getShopImageUrl } from '../utils/images';
import { formatPrice } from '../utils/formatting';

import { addItem } from '../../redux/cart/cart.slice';

import * as S from './category-item.styles';

const CategoryItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, imageFilename } = item;
  const formattedPrice = formatPrice(price);
  const imageUrl = getShopImageUrl(imageFilename);
  return (
    <S.CategoryItemContainer>
      <S.BackgroundImage
        imageUrl = {imageUrl}
        role = 'img'
        aria-label = {name}
      />
      <S.CategoryFooterContainer>
        <S.NameContainer>{name}</S.NameContainer>
        <S.PriceContainer>{formattedPrice}</S.PriceContainer>
      </S.CategoryFooterContainer>
      <S.AddButton onClick={() => dispatch(addItem(item))} inverted>
        Add to cart
      </S.AddButton>
    </S.CategoryItemContainer>
  );
};

export default CategoryItem;
