import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectAreOrdersLoaded } from '../../redux/orders/orders.selector';

import WithSpinner from '../with-spinner/with-spinner.component';
import OrderDetails from './order-details.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectAreOrdersLoaded(state)
});

const OrderDetailsContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(OrderDetails);

export default OrderDetailsContainer;