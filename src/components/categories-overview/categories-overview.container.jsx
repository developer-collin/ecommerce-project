import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsShopFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CategoriesOverview from './categories-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsShopFetching
});

const CategoriesOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CategoriesOverview);

export default CategoriesOverviewContainer;