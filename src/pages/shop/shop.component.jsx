import { useLayoutEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchProductsStart } from '../../redux/shop/shop.slice';

import CategoriesOverviewContainer from '../../components/categories-overview/categories-overview.container';
import CategoryPageContainer from '../../pages/category/category.container';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  useLayoutEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  return (
    <div>
      <Route exact path={`${path}`} component={CategoriesOverviewContainer} />
      <Route path={`${path}/:categoryTitle`} component={CategoryPageContainer} />
    </div>
  );
};

export default ShopPage;