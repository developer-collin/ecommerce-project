import { useDispatch, useSelector } from 'react-redux';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartHidden = useSelector(selectCartHidden);

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
        <OptionLink to='/orders'>ORDERS</OptionLink>
        {
          currentUser
          ? <OptionLink as='div' onClick={() => dispatch(signOutStart())}>SIGN OUT</OptionLink>
          : <OptionLink to={{pathname: '/signin', state: { from: window.location.pathname }}}>
              SIGN IN
            </OptionLink>
        }
        <CartIcon />
      </OptionsContainer>

      {isCartHidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

export default Header;