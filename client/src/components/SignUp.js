import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class SignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
    // Modeled from React Authentication Courses and Sample Markup: sign-up.html
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            // elements prop function creates input fields to be used in the form
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  className=""
                  onChange={this.change} 
                  placeholder="First Name"
                  value={firstName}
                />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  className=""
                  onChange={this.change} 
                  placeholder="Last Name"
                  value={lastName}
                />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  className=""
                  onChange={this.change} 
                  placeholder="Email Address"
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
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  className=""
                  onChange={this.change} 
                  placeholder="Confirm Password"
                  value={confirmPassword}
                />
              </React.Fragment>
            )} />
          <p>
            Already have an account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  //event handler function for changes to each input field
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

    // destructrued context variable allows access to methods from Data.js
      const { context } = this.props;

      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
      } = this.state;

      //create a new user object
      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
      };

      // access the createUser function via context, this is an async function that returns a Promise
      context.data.createUser(user)
      // if the promise is an array of errors, set the errors state of this class to the array
        .then( errors => {
            console.log(errors);
            if(errors.length){
                this.setState( { errors } );
            } else {
                console.log(`${firstName} ${lastName} is successfully signed up. ${emailAddress} authenticated!`);
              }
        })
        // handle rejected promises
        .catch(err => {
            console.log(err);
            this.props.history.push('/error'); // push to history stack

        });

  }

  cancel = () => {
    this.props.history.push('/');

  }
}
