import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
    // Modeled from React Authentication Courses and Sample Markup: sign-up.html
    <div className="grid-66">
    <div className="course--header">
      <h4 className="course--label">Course</h4>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <input 
                  id="title" 
                  name="title" 
                  type="text"
                  className="input-title course--title--input"
                  onChange={this.change} 
                  placeholder="Course title..."
                  value=""
                />
                {/* change to authenticated User */}
                <p>By Joe Smith</p> 
                <div className="course--description">
                    <div>
                      <textarea 
                        id="description"
                        name="description"
                        type="text"
                        className=""
                        onChange={this.change} 
                        placeholder="Course description..."
                        value="">
                      </textarea>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <div>
                                <input 
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    className="course--time--input"
                                    placeholder="Hours"
                                    value=""
                                />
                              </div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <textarea 
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    className=""
                                    placeholder="List materials...">
                                </textarea>
                            </li>
                        </ul>
                    </div>
                </div>
              </React.Fragment>
            )} />

        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {

  }

  cancel = () => {

  }
}
