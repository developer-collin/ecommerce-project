import { getShopImageUrl } from './images.js';

test('should return fallback image url for non-existent image', () => {
  const url = getShopImageUrl('');
  expect(url).toContain('404-by-erik-mclean.jpg');
});

test('should return image url for existing image', async () => {
  const url = getShopImageUrl('yeezy.png');
  expect(url).toContain('yeezy.png');
});