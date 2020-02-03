import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';


//import Components
import Header from './components/Header';
import Courses from './components';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';

import withContext from './Context';

// give Components Context
const SignUpWithContext = withContext(SignUp);
const SignInWithContext = withContext(SignIn);
const CoursesWithContext = withContext(Courses);


export default () => (
  <BrowserRouter>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        {/* <Route path="/authenticated" component={Authenticated} /> */}
        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signup" component={SignUpWithContext} />
        {/* <Route path="/signout" component={SignOut} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);