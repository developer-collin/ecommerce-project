import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CategoryItem from '../../components/category-item/category-item.component';

import { selectCategory } from '../../redux/shop/shop.selectors';

import {
  CategoryPageContainer,
  CategoryTitle,
  CategoryItemsContainer
} from './category.styles';

const CategoryPage = () => {
  const { categoryTitle } = useParams();
  const categories = useSelector(selectCategory(categoryTitle));
  const { title, items } = categories;

  return (
    <CategoryPageContainer>
      <CategoryTitle>{ title }</CategoryTitle>
      <CategoryItemsContainer>
        {items.map(item => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </CategoryItemsContainer>
    </CategoryPageContainer>
  );
};

export default CategoryPage;