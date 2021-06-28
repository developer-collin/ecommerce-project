import { connect } from 'react-redux';

import { getShopImageUrl } from '../utils/images';

import { updateItemQuantity, clearItemFromCart } from '../../redux/cart/cart.actions';

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, updateItemQuantity, clearItem }) => {
  const {id, name, imageFilename, price, quantity} = cartItem;
  const imageUrl = getShopImageUrl(imageFilename);

  const quantityOptions = currentQuantity => {
    const options = [];
    for(let i = currentQuantity + 5; i > 0; i--) {
      options.push(
        <option key={i} value={i}>{i}</option>
      );
    }
    options.push(<option key='0' value='0'>0 (remove)</option>);
    return options;
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt='Item' />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <select
          name='quantity-dropdown'
          value={quantity}
          onChange={e => updateItemQuantity(cartItem, parseInt(e.target.value, 10))}
        >
          { quantityOptions(quantity) }
        </select>
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButtonContainer onClick={() => clearItem(id)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  updateItemQuantity: (item, quantity) => dispatch(updateItemQuantity(item, quantity)),
  clearItem: itemId => dispatch(clearItemFromCart(itemId))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);