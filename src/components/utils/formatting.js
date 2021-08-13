import { DateTime } from 'luxon';

export const formatPrice = dollars => {
  if(dollars % 1 === 0) {
    return dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  } else {
    return dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
};

export const formatStripePrice = cents => {
  const priceInDollars = cents / 100;
  return formatPrice(priceInDollars);
}

export const formatDate = date => (
  DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)
);