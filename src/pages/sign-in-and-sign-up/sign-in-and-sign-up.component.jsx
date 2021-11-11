import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';

const SignInAndSignUp = () => {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (currentUser) {
    return <Navigate to={from} replace={true} />;
  }

  return (
    <SignInAndSignUpContainer>
      <SignIn />
      <SignUp />
    </SignInAndSignUpContainer>
  );
};

export default SignInAndSignUp;