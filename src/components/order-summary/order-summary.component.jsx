import { connect } from 'react-redux';

import { selectOrder } from '../../redux/orders/orders.selector';

import { formatStripePrice, formatDate } from '../../components/utils/formatting';

const OrderSummary = ({ order }) => {
  if (order) {
    const total = formatStripePrice(order.stripeSession.amount_total);
    const orderDate = formatDate(order.createdAt);

    return (
      <div>
        <h1>Test</h1>
        <h2>
          {
            order.id
          }
        </h2>
        <div>
          <div>
            <div>Order Placed</div>
            <div>{ orderDate }</div>
          </div>
          <div>
            <div>Total</div>
            <div>{ total }</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>Order does not exist.</div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  order: selectOrder(ownProps.match.params.id)(state)
});

export default connect(mapStateToProps)(OrderSummary);
