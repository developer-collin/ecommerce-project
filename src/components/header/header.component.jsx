import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import * as S from './header.styles';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const isCartHidden = useSelector(selectCartHidden);

  return (
    <S.HeaderContainer>
      <S.LogoContainer to='/'>
        <Logo />
      </S.LogoContainer>
      <S.OptionsContainer>
        <S.OptionLink to='/shop'>SHOP</S.OptionLink>
        <S.OptionLink to='/orders'>ORDERS</S.OptionLink>
        {
          currentUser
          ? <S.OptionLink as='div' onClick={() => dispatch(signOutStart())}>SIGN OUT</S.OptionLink>
          : <S.OptionLink to='/signin' state={{ from: location }}>
              SIGN IN
            </S.OptionLink>
        }
        <CartIcon />
      </S.OptionsContainer>

      {isCartHidden ? null : <CartDropdown />}
    </S.HeaderContainer>
  );
};

export default Header;