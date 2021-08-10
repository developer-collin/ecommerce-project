import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectAreOrdersLoaded } from '../../redux/orders/orders.selector';

import WithSpinner from '../with-spinner/with-spinner.component';
import OrderHistory from './order-history.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectAreOrdersLoaded(state)
});

const OrderHistoryContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(OrderHistory);

export default OrderHistoryContainer;