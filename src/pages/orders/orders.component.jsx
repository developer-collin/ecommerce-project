import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';

import { fetchOrdersStart } from '../../redux/orders/orders.slice';

import OrderHistoryContainer from '../../components/order-history/order-history.container';
import OrderDetailsContainer from '../../components/order-details/order-details.container';

const OrdersPage = ({ fetchOrdersStart }) => {
  useEffect(() => {
    fetchOrdersStart();
  }, [fetchOrdersStart]);

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

const mapDispatchToProps = dispatch => ({
  fetchOrdersStart: () => dispatch(fetchOrdersStart())
});

export default connect(null, mapDispatchToProps)(OrdersPage);
