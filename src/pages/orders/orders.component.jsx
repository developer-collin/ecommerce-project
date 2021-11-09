import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';

import { fetchOrdersStart } from '../../redux/orders/orders.slice';

import OrderHistoryContainer from '../../components/order-history/order-history.container';
import OrderDetailsContainer from '../../components/order-details/order-details.container';

const OrdersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersStart());
  }, [dispatch]);

  const { path } = useRouteMatch();

  return (
    <>
      <Route
        exact
        path={`${path}`}
        component={OrderHistoryContainer}
      />
      <Route
        exact
        path={`${path}/:id`}
        component={OrderDetailsContainer} />
    </>
  );
};

export default OrdersPage;
