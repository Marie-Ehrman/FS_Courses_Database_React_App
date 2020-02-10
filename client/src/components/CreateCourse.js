import React, { Component } from 'react';
import Form from './Form';


// create as a PrivateRoute
// Modeled from React Authentication Courses and Sample Markup: course-create.html

export default class CreateCourse extends Component {

  state = {
    userId: this.props.context.authenticatedUser.id,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  render() {

    const { context } = this.props;

    //variable to store instructor as the authenticated user creating it
    const instructor = `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;


    return (
    
      <div className="bounds course--detail">
      <h1>Create Course</h1>
        <div>
          {/* dynamic form from Form helper component */}
          <Form 
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Create Course"
              // elements prop function creates input fields to be used in the form
              elements={() => (      
                  <React.Fragment>

                      <div className="grid-66">
                          <div className="course--header">
                              <h4 className="course--label">Course</h4>
                                      {/* course title */}
                                      <input
                                      id="title"
                                      name="title"
                                      type="text"
                                      className="input-title course--title--input"
                                      onChange={this.change} 
                                      placeholder="Course title..."
                                      value={`${title}`}/>

                                      {/* course taught by */}
                                      <p>By {`${ instructor }`}</p>
                          </div>

                          {/* course description */}
                          <div className="course--description">
                                  <textarea
                                      id="description"
                                      name="description"
                                      className=""
                                      onChange={this.change} 
                                      placeholder="Course description..."
                                      value={`${ description }`}>
                                  </textarea>
                          </div>
                      </div>

                      {/* course estimated time and materials needed */}
                      <div className="grid-25 grid-right">
                          <div className="course--stats">
                              <ul className="course--stats--list">
                                  <li className="course--stats--list--item">
                                      <h4>Estimated Time</h4>
                                          <input
                                              id="estimatedTime"
                                              name="estimatedTime"
                                              type="text"
                                              className="course--time--input"
                                              onChange={this.change}
                                              placeholder="# Hours"
                                              value={`${ estimatedTime }`}/>
                                  </li>
                                  <li className="course--stats--list--item">
                                      <h4>Materials Needed</h4>
                                      <div>
                                          <textarea
                                              id="materialsNeeded"
                                              name="materialsNeeded"
                                              className=""
                                              onChange={this.change}
                                              placeholder="List materials..."
                                              value={`${ materialsNeeded }`}>
                                          </textarea>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </React.Fragment>
              )} 
          />
        </div>
      </div>
    )
  }

  //dynamically update state using onChange from the JSX above
  change = (event) => {

    //dynamically change the input while updating state
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {

    const { context } = this.props;

    const {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    // store authenticated user to POST method in Data.js
    const  authUser  = context.authenticatedUser;

    //create a new course object passing all the neccessary variables for the POST method in Data.js
    const course = {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    // access the createCourse function via context
    
        context.data.createCourse( course, authUser.emailAddress, authUser.password )
        // if the promise is an array of errors, set the errors state of this class to the array
          .then( errors => {
              if(errors.length){
                  this.setState( { errors } );
              } else {
                  context.actions.signIn( authUser.emailAddress, authUser.password )
                      .then(() => {
                          this.props.history.push('/');
                      });
                }
          })
          // handle rejected promises
          .catch(err => {
              this.props.history.push('/error'); // push to history stack

          });
  }

  cancel = () => {
    // redirect to the course
      this.props.history.push('/');
  }
}
