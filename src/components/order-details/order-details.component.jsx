import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectOrder } from '../../redux/orders/orders.selector';
import { clearCart } from '../../redux/cart/cart.slice';

import { formatStripePrice, formatDate } from '../utils/formatting';

import * as S from './order-details.styles';

import OrderLineItem from '../order-line-item/order-line-item.component';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const order = useSelector(selectOrder(id));

  useEffect(() => {
    // If a redirect back from Stripe Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      dispatch(clearCart());
    }
  }, [dispatch]);

  if (order) {
    const { amount_subtotal,
            amount_total,
            shipping } = order.stripeSession;
    const { amount_discount,
            amount_shipping,
            amount_tax } = order.stripeSession.total_details;
  
    const orderDate = formatDate(order.createdAt);
    const subtotal = formatStripePrice(amount_subtotal);
    const total = formatStripePrice(amount_total);
    const discounts = formatStripePrice(amount_discount);
    const shippingCost = formatStripePrice(amount_shipping);
    const tax = formatStripePrice(amount_tax);

    return (
      <>
        <h1>Order Details</h1>
        <S.Headline>
          <div>
            <span>Ordered on </span>
            <span>{ orderDate }</span>
          </div>
          <div>
            <span>Order # </span>
            <S.OrderId>{ order.id }</S.OrderId>
          </div>
        </S.Headline>
        <S.Details>
          <S.Shipping>
            <S.DetailsTitle>Shipping Address</S.DetailsTitle>
            <div>{ shipping.name }</div>
            <div>{ shipping.address.line1 }</div>
            { shipping.address.line2 ? (
              <div>{ shipping.address.line2 }</div>
            ) : null }
            <div>
              { `${shipping.address.city}, 
                 ${shipping.address.state}
                 ${shipping.address.postal_code}
                `}
            </div>
          </S.Shipping>
          <S.CostSummary>
            <S.DetailsTitle>Order Summary</S.DetailsTitle>
            <S.Label>Item(s) Subtotal:</S.Label>
            <S.Value>{ subtotal }</S.Value>
            <S.Label>Shipping & Handling:</S.Label>
            <S.Value>{ shippingCost }</S.Value>
            <S.Label>Tax:</S.Label>
            <S.Value>{ tax }</S.Value>
            { amount_discount ? (
                <>
                  <S.Label>Discounts:</S.Label>
                  <S.Value>-{ discounts }</S.Value>
                </>
              ) : null
            }
            <S.Label footer>Total:</S.Label>
            <S.Value footer>{ total }</S.Value>
          </S.CostSummary>
        </S.Details>
        <S.LineItems>
          {
            order.cart.cartItems.map(item =>
              <OrderLineItem key={item.id} item={item}/>
            )
          }
        </S.LineItems>
      </>
    );
  } else {
    return (
      <div>Order does not exist.</div>
    );
  }
};

export default OrderDetails;
