import { Link } from 'react-router-dom';

import CategoryItem from '../category-item/category-item.component';

import {
  CategoryPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './category-preview.styles';

const CategoryPreview = ({ title, items, routeName }) => {
  return (
  <CategoryPreviewContainer>
    <TitleContainer>
      <Link to={routeName}>
        {title}
      </Link>
    </TitleContainer>
    <PreviewContainer>
      {
        items
          .filter((item, index) => index < 4)
          .map(item => (
            <CategoryItem key={item.id} item={item} />
          ))
      }
    </PreviewContainer>
  </CategoryPreviewContainer>
)};

export default CategoryPreview;