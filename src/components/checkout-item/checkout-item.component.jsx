import { useDispatch } from 'react-redux';

import { getShopImageUrl } from '../utils/images';

import { updateItemQuantity, clearItemFromCart } from '../../redux/cart/cart.slice';

import * as S from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
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
    <S.CheckoutItemContainer>
      <S.ImageContainer>
        <img src={imageUrl} alt='Item' />
      </S.ImageContainer>
      <S.TextContainer>{name}</S.TextContainer>
      <S.QuantityContainer>
        <select
          name='quantity-dropdown'
          value={quantity}
          onChange={e => dispatch(updateItemQuantity(cartItem, parseInt(e.target.value, 10)))}
        >
          { quantityOptions(quantity) }
        </select>
      </S.QuantityContainer>
      <S.TextContainer>{price}</S.TextContainer>
      <S.RemoveButtonContainer onClick={() => dispatch(clearItemFromCart(id))}>
        &#10005;
      </S.RemoveButtonContainer>
    </S.CheckoutItemContainer>
  );
};

export default CheckoutItem;