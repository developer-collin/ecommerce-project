import memoize from 'lodash.memoize';

import { createSelector } from 'reselect';

export const selectOrders = state => state.orders;

export const selectAllOrders = createSelector(
  [selectOrders],
  orders => orders.items ? Object.values(orders.items) : []
);

export const selectOrder = memoize(orderIdUrlParam => 
  createSelector(
    [selectOrders],
    orders => orders.items[orderIdUrlParam] ? orders.items[orderIdUrlParam] : null
  )
);

export const selectAreOrdersFetching = createSelector(
  [selectOrders],
  orders => orders.isFetching
);

export const selectAreOrdersLoaded = createSelector(
  [selectOrders],
  orders => !!orders.items
);
