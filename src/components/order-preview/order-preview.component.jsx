import { Link } from 'react-router-dom';

import { formatDate, formatStripePrice } from '../../components/utils/formatting';

import OrderLineItem from '../order-line-item/order-line-item.component';

import * as S from './order-preview.styles';

const OrderPreview = ({ order }) => {
  const orderDate = formatDate(order.createdAt);
  const { amount_total } = order.stripeSession;
  const total = formatStripePrice(amount_total);

  
  return (
    <div>
      <S.Headline>
        <div>
          <S.Title>Ordered on</S.Title>
          { orderDate }
        </div>
        <div>
          <S.Title>Total</S.Title>
          { total }
        </div>
        <S.ViewDetails>
          <Link to={order.id}>
            View order details
          </Link>
        </S.ViewDetails>
      </S.Headline>
      <S.Details>
        {
          order.cart.cartItems.map(item =>
            <OrderLineItem key={item.id} item={item}/>
          )
        }
      </S.Details>
    </div>
  );
};

export default OrderPreview;
