// Displays the index route with a list of all courses

import React, { Component } from 'react';
import Error from './Error'


export default class Courses extends Component {

  state = {
    courses: []
  }

componentDidMount(){
  const { context } = this.props;

  context.data.getCourses()
         .then(courses => {this.setState({ courses })});

}

  render() {
    const { courses } = this.state;

    return (

      // create element to hold course cards, this dynamically create a card for each course
      // in the database
      <div className="bounds">

      {this.state.courses.map(course => {
          return(
          <div className="grid-33" key={`${course.id}`}>
            <a className="course--module course--link" href={`/courses/${course.id}`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{`${course.title}`}</h3>
            </a>
          </div>
        )

      })}

        <div className="grid-33">
        {/* Link to Create Course */}
            <a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
            </a>
        </div>
      </div>
    )
  }
}