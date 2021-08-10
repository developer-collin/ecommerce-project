import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectAreOrdersLoaded } from '../../redux/orders/orders.selector';

import WithSpinner from '../with-spinner/with-spinner.component';
import OrderSummary from './order-summary.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectAreOrdersLoaded(state)
});

const OrderSummaryContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(OrderSummary);

export default OrderSummaryContainer;