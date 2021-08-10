import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectAllOrders } from '../../redux/orders/orders.selector';

import OrderPreview from '../../components/order-preview/order-preview.component';

const OrderHistory = ({ orders }) => {
  return (
    <div>
      <h1>Orders:</h1>
      {
        orders && orders.length ? (
          <ul>
            {
              orders.map(order => (
                <OrderPreview key={order.id} order={order} />
              ))
            }
          </ul>
        ) : (
          <div>
            You have no orders at this time.
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orders: selectAllOrders,
});

export default connect(mapStateToProps)(OrderHistory);
