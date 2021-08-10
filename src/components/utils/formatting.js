import { DateTime } from 'luxon';

export const formatStripePrice = cents => {
  const priceInDollars = cents / 100;

  if(priceInDollars % 1 === 0) {
    return priceInDollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  } else {
    return priceInDollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
};

export const formatDate = date => (
  DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)
);