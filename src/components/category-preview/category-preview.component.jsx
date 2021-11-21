import { Link } from 'react-router-dom';

import CategoryItem from '../category-item/category-item.component';

import * as S from './category-preview.styles';

const CategoryPreview = ({ title, items, routeName }) => {
  return (
  <S.CategoryPreviewContainer>
    <S.TitleContainer>
      <Link to={routeName}>
        {title}
      </Link>
    </S.TitleContainer>
    <S.PreviewContainer>
      {
        items
          .filter((item, index) => index < 4)
          .map(item => (
            <CategoryItem key={item.id} item={item} />
          ))
      }
    </S.PreviewContainer>
  </S.CategoryPreviewContainer>
)};

export default CategoryPreview;