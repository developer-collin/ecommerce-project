import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchOrdersStart } from '../../redux/orders/orders.actions';

import OrderHistoryContainer from '../../components/order-history/order-history.container';
import OrderSummaryContainer from '../../components/order-summary/order-summary.container';

const OrdersPage = ({ fetchOrdersStart, match }) => {
  useEffect(() => {
    fetchOrdersStart();
  }, [fetchOrdersStart]);

  return (
    <>
      <Route
        exact
        path={`${match.path}`}
        component={OrderHistoryContainer}
      />
      <Route
        exact
        path={`${match.path}/:id`}
        component={OrderSummaryContainer} />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchOrdersStart: () => dispatch(fetchOrdersStart())
});

export default connect(null, mapDispatchToProps)(OrdersPage);
