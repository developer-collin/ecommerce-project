import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { fetchOrdersStart } from '../../redux/orders/orders.slice';

const OrdersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersStart());
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default OrdersPage;
