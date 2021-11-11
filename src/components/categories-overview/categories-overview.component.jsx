import { useSelector } from 'react-redux';

import CategoryPreview from '../category-preview/category-preview.component';

import { selectCategoriesForPreview } from '../../redux/shop/shop.selectors';

import { CategoriesOverviewContainer } from './categories-overview.styles';

const CategoriesOverview = () => {
  const categories = useSelector(selectCategoriesForPreview);
  
  return (
    <CategoriesOverviewContainer>
      {
        categories.map(props => (
          <CategoryPreview key={props.title} {...props} />
        ))
      }
    </CategoriesOverviewContainer>
  );
};

export default CategoriesOverview;