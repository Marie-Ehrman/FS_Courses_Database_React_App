// File used to Display an individual Course-Detail when clicked on from the index.js file

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';


export default class CourseDetail extends Component {


  state = {
    course: {
        User:{}
    },
    id: this.props.match.params.id
  }

  componentDidMount(){
    const { context } = this.props;

    context.data.getCourseDetail(this.state.id)
          .then(course => {this.setState({ course })})
          .catch(err => {
            this.props.history.push('/error'); // push to history stack
          });
  }


  render() {

    const { context } = this.props;
    const { course } = this.state;

    const instructor = this.state.course.User;
    const authUser = context.authenticatedUser;
    

    // convert these texts into strings to pass to React Markdown
    const description = `${course.description}`;
    const materials = `${course.materialsNeeded}`;

    return (
      <div className="bounds">
        <div className="grid-100">
          <h1>Courses</h1>
          <div>
            {/* dynamically render buttons */}
            <div className="actions--bar">
              <div className="bounds">
                { authUser === null || authUser.id !== instructor.id
                  ?
                  <div className="grid-100">
                    <NavLink to="/"className="button button-secondary">Return to List</NavLink>
                  </div>
                  :
                  <div className="grid-100">
                    <span>
                      <NavLink className="button" href={`/courses/${course.id}/update`}>Update Course</NavLink>
                      <NavLink className="button" onClick={this.delete} href="/">Delete Course</NavLink>
                    </span>
                    <NavLink to="/"className="button button-secondary">Return to List</NavLink>
                  </div>
                }
              </div>
            </div>
    
            {/* course detail elements */}
            <div className="bounds course--detail">
              <div className="grid-66">
                {/* course title */}
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{`${course.title}`}</h3>
                  <p>By {`${instructor.firstName} ${instructor.lastName}`}</p>
                </div>

                {/* course description */}
                <div className="course--description">
                  <ReactMarkdown source={description} />
                </div>
              </div>

              {/* course estimated time and materials needed */}
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{`${course.estimatedTime}`}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <ReactMarkdown source={materials}/>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // delete function for the delete button
  delete = () => {

        const { context } = this.props;
        const {
          course,
          id,
        } = this.state;

        const user = context.authenticatedUser;

        const pass = context.authenticatedUser.password;

        // pass the authenticated user's email and password and the courses id for the delete function to execute
        context.data.deleteCourse(user.emailAddress, pass, id)
        .then( errors => {
          if(errors.length){
              this.setState( { errors } );
          } else {
              console.log(`${course.title} is successfully deleted.`);
              this.props.history.push('/'); // push index route to history

            }
        })
      // handle rejected promises
      .catch(err => {
        console.log(err);
          this.props.history.push('/error'); // push to history stack

      });

  }
}
