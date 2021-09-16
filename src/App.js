import { useLayoutEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { auth } from './firebase/firebase.utils';

import { connect } from 'react-redux';

import AuthRoute from './components/auth-route/auth-route.component';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import GlobalStyle from './global.styles';

import { userAuthSuccess } from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const OrdersPage = lazy(() => import('./pages/orders/orders.component'));
const NotFoundPage = lazy(() => import('./pages/not-found/not-found.component'));

const App = ({ userAuthSuccess }) => {
  useLayoutEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        // Logged in
        userAuthSuccess(userAuth);
      }
    });

    return () => unsubscribeFromAuth();
  }, [userAuthSuccess]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {/* Remove trailing slashes
              https://github.com/ReactTraining/react-router/issues/4841#issuecomment-821980722 */}
            <Redirect from="/:url*(/+)" to={window.location.pathname.replace(/\/+$/, window.location.search)} />
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <AuthRoute exact path='/checkout' component={CheckoutPage} />
            <AuthRoute path='/orders' component={OrdersPage} />
            <Route exact path='/signin' component={SignInAndSignUp} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  userAuthSuccess: userAuth => dispatch(userAuthSuccess(userAuth))
});

export default connect(null, mapDispatchToProps)(App);
