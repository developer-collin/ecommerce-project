import { useLayoutEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { fetchProductsStart } from '../../redux/shop/shop.slice';

const ShopPage = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ShopPage;