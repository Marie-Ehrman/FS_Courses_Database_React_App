import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
    // Modeled from React Authentication Courses and Sample Markup: sign-in.html
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  className=""
                  onChange={this.change} 
                  placeholder="User Name"
                  value={emailAddress}
                />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  className=""
                  onChange={this.change} 
                  placeholder="Password" 
                  value={password}
                />                
              </React.Fragment>
            )} />
          <p>
            No account? <Link to="/signup">Click here</Link> to sign up!
          </p>
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
