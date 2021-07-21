import { connect } from 'react-redux';

import CategoryItem from '../../components/category-item/category-item.component';

import { selectCategory } from '../../redux/shop/shop.selectors';

import {
  CategoryPageContainer,
  CategoryTitle,
  CategoryItemsContainer
} from './category.styles';

const CategoryPage = ({ categories }) => {
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
  )
};

const mapStateToProps = (state, ownProps) => ({
  categories: selectCategory(ownProps.match.params.categoryTitle)(state)
});

export default connect(mapStateToProps)(CategoryPage);