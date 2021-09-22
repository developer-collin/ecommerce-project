import { connect } from 'react-redux';

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

const CategoryItem = ({ item, addItem }) => {
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
      <AddButton onClick={() => addItem(item)} inverted>
        Add to cart
      </AddButton>
    </CategoryItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CategoryItem);
