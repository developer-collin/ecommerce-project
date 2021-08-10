import { Link, useLocation } from 'react-router-dom';

import { formatDate } from '../../components/utils/formatting';

const OrderPreview = ({ order }) => {
  const location = useLocation();
  const orderDate = formatDate(order.createdAt);

  return (
    <li>
      Order date: 
      <Link to={`${location.pathname}/${order.id}`}>
        { orderDate }
      </Link>
    </li>
  );
};

export default OrderPreview;
