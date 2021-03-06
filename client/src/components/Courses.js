// Displays the index route with a list of all courses

import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';


export default class Courses extends Component {

  state = {
    courses: []
  }

  componentDidMount(){
    const { context } = this.props;

    context.data.getCourses()
          .then(courses => {this.setState({ courses })})
          .catch(err => {
            this.props.history.push('/error'); // push to history stack
          });

  }

  render() {

    const { courses } = this.state;

    return (

      // create element to hold course cards
      <div className="bounds">

      {/* this dynamically creates a card for each course in the database */}
      {courses.map(course => {
          return(
              <div className="grid-33" key={`${course.id}`}>
                <NavLink to={`/courses/${course.id}`} className="course--module course--link">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{`${course.title}`}</h3>
                </NavLink>
              </div>
          )

      })}

        <div className="grid-33">
        {/* Link to Create Course Component*/}
          <NavLink to="/courses/create" className="course--module course--add--module">
            <h3 className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>Create Course</h3>
          </NavLink>
        </div>
      </div>
    )
  }
}