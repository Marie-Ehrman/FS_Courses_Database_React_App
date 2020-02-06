// File used to Display an individual Course-Detail when clicked on from the index.js file

import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {


  state = {
    course: [],
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

    const { course } = this.state;
    const instructor = this.state.course.User;

    // convert these texts into strings to pass to React Markdown
    const description = `${course.description}`;
    const materials = `${course.materialsNeeded}`;

    console.log(instructor);
    return (
      <div className="bounds">
        <div className="grid-100">
          <h1>Courses</h1>
          <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
            <a className="button" href={`/courses/${'id'}/update`}>Update Course</a>
            <a className="button" href="#">Delete Course</a>
            </span>
            <a className="button button-secondary" href="/">Return to List</a>
          </div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{`${course.title}`}</h3>
            {/* <p>By {`${course.User.firstName} ${course.User.lastName}`}</p> */}
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
}
