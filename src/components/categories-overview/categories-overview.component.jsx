import { useSelector } from 'react-redux';

import CategoryPreview from '../category-preview/category-preview.component';

import { selectCategoriesForPreview } from '../../redux/shop/shop.selectors';

import * as S from './categories-overview.styles';

const CategoriesOverview = () => {
  const categories = useSelector(selectCategoriesForPreview);
  
  return (
    <S.CategoriesOverviewContainer>
      {
        categories.map(props => (
          <CategoryPreview key={props.title} {...props} />
        ))
      }
    </S.CategoriesOverviewContainer>
  );
};

export default CategoriesOverview;