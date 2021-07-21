import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectAreCategoriesLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CategoryPage from './category.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectAreCategoriesLoaded(state)
});

const CategoryPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CategoryPage);

export default CategoryPageContainer;