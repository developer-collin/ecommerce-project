import { useLayoutEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProductsStart } from '../../redux/shop/shop.actions';

import CategoriesOverviewContainer from '../../components/categories-overview/categories-overview.container';
import CategoryPageContainer from '../../pages/category/category.container';

const ShopPage = ({ fetchProductsStart, match }) => {
  useLayoutEffect(() => {
    fetchProductsStart();
  }, [fetchProductsStart]);

  return (
    <div>
      <Route
        exact
        path={`${match.path}`}
        component={CategoriesOverviewContainer}
      />
      <Route
        path={`${match.path}/:categoryTitle`}
        component={CategoryPageContainer} />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchProductsStart: () => dispatch(fetchProductsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);