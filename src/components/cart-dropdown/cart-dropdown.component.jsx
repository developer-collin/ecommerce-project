import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';

import { toggleCartHidden } from '../../redux/cart/cart.slice';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
  CartDropdownButton
} from './cart-dropdown.styles';

const CartDropdown = ({cartItems, history, toggleCart}) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {
        cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )
      }
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('/checkout');
        toggleCart();
      }}>
        GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  toggleCart: () => dispatch(toggleCartHidden())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));