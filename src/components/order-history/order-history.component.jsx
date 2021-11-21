import { useSelector } from 'react-redux';

import { selectAllOrders } from '../../redux/orders/orders.selector';

import OrderPreview from '../../components/order-preview/order-preview.component';

const OrderHistory = () => {
  const orders = useSelector(selectAllOrders);

  return (
    <>
      <h1>Orders:</h1>
      {
        orders && orders.length ? (
          <>
            {
              orders.map(order => (
                <OrderPreview key={order.id} order={order} />
              ))
            }
          </>
        ) : (
          <div>
            You have no orders at this time.
          </div>
        )
      }
    </>
  );
};

export default OrderHistory;
