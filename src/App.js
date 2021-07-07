import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const app = props => {
  const isAuth = useSelector(state => state.auth.token !== null);
  const authToken = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  const onTryAutoSignup = () => dispatch(actions.authCheckState());


  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup, authToken]);

  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );
  if (isAuth) {
    routes = (
      <Switch>
        <Route path='/orders' render={(props) => <Orders {...props} />} />
        <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }



  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>} >
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

export default withRouter(app);
