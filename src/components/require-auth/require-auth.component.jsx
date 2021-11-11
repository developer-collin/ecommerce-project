import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors';

const RequireAuth = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;