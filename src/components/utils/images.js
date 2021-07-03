export const getShopImageUrl = imageFilename => {
  let imageUrl = '';

  try {
    imageUrl = require(`../../assets/shop/${imageFilename}`);
  } catch (error) {
    imageUrl = require('../../assets/shop/404-by-erik-mclean.jpg');
  }

  // require returns object in tests, use default value when it exists
  if(typeof imageUrl === 'object' && imageUrl.default) {
    imageUrl = imageUrl.default;
  }

  return imageUrl;
};
