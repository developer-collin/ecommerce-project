import * as S from './order-line-item.styles';

import { getShopImageUrl } from '../utils/images';
import { formatPrice } from '../utils/formatting';

const OrderLineItem = ({ item: { imageFilename, quantity, price, name }}) => {
  const imageUrl = getShopImageUrl(imageFilename);
  const priceFormatted = formatPrice(price);

  return (
    <S.LineItemContainer>
      <S.ImageWrap>
        <img src={imageUrl} alt='Product' />
      </S.ImageWrap>
      <S.Info>
        <S.Name>
          { name }
        </S.Name>
        { quantity > 1 ? (
            <S.Quantity>
              Qty: { quantity }
            </S.Quantity>
          ) : null
        }
        <S.Price>
          { priceFormatted }
          { quantity > 1 ? ' each' : null }
        </S.Price>
      </S.Info>
      <S.Actions>
        Actions TBD
      </S.Actions>
    </S.LineItemContainer>
  )
}

export default OrderLineItem;