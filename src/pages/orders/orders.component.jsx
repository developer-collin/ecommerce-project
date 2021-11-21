import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { fetchOrdersStart } from '../../redux/orders/orders.slice';

import * as S from './orders.styles';

const OrdersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersStart());
  }, [dispatch]);

  return (
    <S.OrdersPageContainer>
      <Outlet />
    </S.OrdersPageContainer>
  );
};

export default OrdersPage;
