import memoize from 'lodash.memoize';

import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCategories = createSelector(
  [selectShop],
  shop => shop.categories
);

export const selectCategoriesForPreview = createSelector(
  [selectCategories],
  categories => categories ? Object.values(categories) : []
);

export const selectCategory = memoize(categoryUrlParam =>
  createSelector(
    [selectCategories],
    categories => categories ? categories[categoryUrlParam] : null
  )
);

export const selectIsShopFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectAreCategoriesLoaded = createSelector(
  [selectShop],
  shop => !!shop.categories
);