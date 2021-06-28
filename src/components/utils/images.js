export const getShopImageUrl = imageFilename => {
  let imageUrl = '';

  try {
    imageUrl = require(`../../assets/shop/${imageFilename}`).default;
  } catch (error) {
    imageUrl = require('../../assets/shop/404-by-erik-mclean.jpg').default;
  }

  return imageUrl;
}
