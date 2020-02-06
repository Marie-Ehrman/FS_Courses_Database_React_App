import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';


//import Components
import Header from './components/Header';
import Courses from './components';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';

import withContext from './Context';

// give Components Context subscribing access to data and actions
const HeaderWithContext = withContext(Header);
const SignUpWithContext = withContext(SignUp);
const SignInWithContext = withContext(SignIn);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);



export default () => (
  <BrowserRouter>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/create" component={CreateCourseWithContext} />

        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signup" component={SignUpWithContext} />
        {/* <Route path="/signout" component={SignOut} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);