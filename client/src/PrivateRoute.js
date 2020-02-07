import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';


// destructure and rename component prop
export default ({ component: Component, ...rest }) => {
  return (
    //subscribe PrivateRoute to context
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => 
                    context.authenticatedUser ? // if user is authenticated, componenet passed to this component gets rendered
                     ( <Component {...props} />)
                     : // if user is not authenticated redirect to sign in page
                     (<Redirect to={{
                          pathname: '/signin',
                          state: { from: props.location },
                     }} /> )
          }
        />
      )}
    </Consumer>
  );
};