import { useDispatch } from 'react-redux';

import { getShopImageUrl } from '../utils/images';

import { addItem } from '../../redux/cart/cart.slice';

import {
  CategoryItemContainer,
  CategoryFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer
} from './category-item.styles';

const CategoryItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, imageFilename } = item;
  const imageUrl = getShopImageUrl(imageFilename);
  return (
    <CategoryItemContainer>
      <BackgroundImage
        imageUrl = {imageUrl}
        role = 'img'
        aria-label = {name}
      />
      <CategoryFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CategoryFooterContainer>
      <AddButton onClick={() => dispatch(addItem(item))} inverted>
        Add to cart
      </AddButton>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
