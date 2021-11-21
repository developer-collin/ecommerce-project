import { useLayoutEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { auth } from './firebase/firebase.utils';
import { onAuthStateChanged } from "firebase/auth";

import { useDispatch } from 'react-redux';

import RequireAuth from './components/require-auth/require-auth.component';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import GlobalStyle from './global.styles';

import { userAuthSuccess } from './redux/user/user.actions';

import CategoriesOverviewContainer from './components/categories-overview/categories-overview.container';
import CategoryPageContainer from './pages/category/category.container';
import OrderHistoryContainer from './components/order-history/order-history.container';
import OrderDetailsContainer from './components/order-details/order-details.container';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const OrdersPage = lazy(() => import('./pages/orders/orders.component'));
const NotFoundPage = lazy(() => import('./pages/not-found/not-found.component'));

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, userAuth => {
      if(userAuth) {
        // Logged in
        dispatch(userAuthSuccess(userAuth));
      }
    });

    return () => unsubscribeFromAuth();
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<ShopPage />}>
              <Route index element={<CategoriesOverviewContainer />} />
              <Route path=':categoryTitle' element={<CategoryPageContainer />} />
            </Route>
            <Route path='/checkout' element={<RequireAuth><CheckoutPage /></RequireAuth>} />
            <Route path='/orders' element={<RequireAuth><OrdersPage /></RequireAuth>}>
              <Route index element={<OrderHistoryContainer />} />
              <Route path=':id' element={<OrderDetailsContainer />} />
            </Route>
            <Route path='/signin' element={<SignInAndSignUp />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
