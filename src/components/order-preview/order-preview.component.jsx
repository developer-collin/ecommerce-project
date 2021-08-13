import { Link, useRouteMatch } from 'react-router-dom';

import { formatDate } from '../../components/utils/formatting';

const OrderPreview = ({ order }) => {
  const { url } = useRouteMatch();
  const orderDate = formatDate(order.createdAt);

  return (
    <li>
      Order date: 
      <Link to={`${url}/${order.id}`}>
        { orderDate }
      </Link>
    </li>
  );
};

export default OrderPreview;
