import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';


//import Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';


import NotFound from './components/NotFound';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';


// give Components Context subscribing access to data and actions
const HeaderWithContext = withContext(Header);

// courses
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

// login
const SignUpWithContext = withContext(UserSignUp);
const SignInWithContext = withContext(UserSignIn);
const SignOutWithContext = withContext(UserSignOut);



// Set up routes
export default () => (
  <BrowserRouter>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signup" component={SignUpWithContext} />
        <Route path="/signout" component={SignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);