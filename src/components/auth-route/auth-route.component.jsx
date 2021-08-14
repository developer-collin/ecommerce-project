import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors';

const AuthRoute = ({component: Component, ...otherProps}) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Route {...otherProps} 
      render={({ location }) =>
        currentUser
        ? <Component />
        : <Redirect to={{
            pathname: '/signin',
            state: { from: location }
          }} />
      }
    />
  );
};

export default AuthRoute;