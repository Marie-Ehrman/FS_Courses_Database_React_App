import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';


//import Components
import Header from './components/Header';
import index from './components';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';

import withContext from './Context';

// give Components Context
const SignUpWithContext = withContext(SignUp);
const SignInWithContext = withContext(SignIn);



export default () => (
  <BrowserRouter>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={index} />
        {/* <Route path="/authenticated" component={Authenticated} /> */}
        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signup" component={SignUpWithContext} />
        {/* <Route path="/signout" component={SignOut} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);