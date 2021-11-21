import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CategoryItem from '../../components/category-item/category-item.component';

import { selectCategory } from '../../redux/shop/shop.selectors';

import * as S from './category.styles';

const CategoryPage = () => {
  const { categoryTitle } = useParams();
  const category = useSelector(selectCategory(categoryTitle));

  if(!category) return (
    <S.CategoryPageContainer>
      <S.CategoryTitle>
        Category not found
      </S.CategoryTitle>
    </S.CategoryPageContainer>
  );

  return (
    <S.CategoryPageContainer>
      <S.CategoryTitle>{ category.title }</S.CategoryTitle>
      <S.CategoryItemsContainer>
        {category.items.map(item => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </S.CategoryItemsContainer>
    </S.CategoryPageContainer>
  );
};

export default CategoryPage;