import './checkout-item.styles.scss';

import { connect } from 'react-redux';

import { addItem, removeItem, clearItemFromCart } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
  const {id, name, imageUrl, price, quantity} = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='Item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => removeItem(id)}>&#10094;</div>
        <span className='value'>
          {quantity}
        </span>
        <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItem(id)}>&#10005;</div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: itemId => dispatch(removeItem(itemId)),
  clearItem: itemId => dispatch(clearItemFromCart(itemId))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);