import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CategoryPreview from '../category-preview/category-preview.component';

import { selectCategoriesForPreview } from '../../redux/shop/shop.selectors';

import { CategoriesOverviewContainer } from './categories-overview.styles';

const CategoriesOverview = ({ categories }) => (
  <CategoriesOverviewContainer>
    {
      categories.map(props => (
        <CategoryPreview key={props.title} {...props} />
      ))
    }
  </CategoriesOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesForPreview
});

export default connect(mapStateToProps)(CategoriesOverview)