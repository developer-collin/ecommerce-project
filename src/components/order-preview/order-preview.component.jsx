import { Link } from 'react-router-dom';

import { formatDate } from '../../components/utils/formatting';

const OrderPreview = ({ order }) => {
  const orderDate = formatDate(order.createdAt);

  return (
    <li>
      Order date: 
      <Link to={order.id}>
        { orderDate }
      </Link>
    </li>
  );
};

export default OrderPreview;
