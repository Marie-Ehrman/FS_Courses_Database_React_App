// File used to Display an individual Course-Detail when clicked on from the index.js file

import React, { Component } from 'react';
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

    console.log(authUser.id);
    console.log(instructor.id);
    

    // convert these texts into strings to pass to React Markdown
    const description = `${course.description}`;
    const materials = `${course.materialsNeeded}`;

    return (
      <div className="bounds">
        <div className="grid-100">
          <h1>Courses</h1>
          <div>
      <div className="actions--bar">
        <div className="bounds">
          { authUser.id === instructor.id ?
                <div className="grid-100">
                <span>
                <a className="button" href={`/courses/${course.id}/update`}>Update Course</a>
                <a className="button" onClick={this.delete} href="/">Delete Course</a>
                </span>
                <a className="button button-secondary" href="/">Return to List</a>
                </div>
            :
                <div className="grid-100">
                <a className="button button-secondary" href="/">Return to List</a>
                </div>
          }
          
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{`${course.title}`}</h3>
            <p>By {`${instructor.firstName} ${instructor.lastName}`}</p>
          </div>
          <div className="course--description">

          <ReactMarkdown source={description} />
            
          </div>

          
        </div>
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

  delete = () => {

        const { context } = this.props;
        const {
          course,
          id,
        } = this.state;

        const user = this.state.course.User;
        const pass = context.authenticatedUser.password;


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
