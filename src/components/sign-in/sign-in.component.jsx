import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles';

const SignIn = () => {
  const dispatch = useDispatch();
  
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });
  
  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(emailSignInStart({ email, password }));
  }

  const handleChange = event => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  }

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          id='email'
          name='email'
          type='email'
          value={email}
          handleChange={handleChange}
          label='email'
          required
        />
        <FormInput
          id='password'
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
        <ButtonsBarContainer>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton type='button' isGoogleSignIn onClick={() => dispatch(googleSignInStart())}>
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
}

export default SignIn;