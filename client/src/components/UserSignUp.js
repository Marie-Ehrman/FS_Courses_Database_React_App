import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
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

    console.log(password);
    console.log(confirmPassword);
        console.log(errors);

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
            Already have an account? <NavLink to="/signin">Click here</NavLink> to sign in!
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

      // create error message for when password and confirm password do not match
      const passwordError = { message: "Passwords must match" };

      
      // access the createUser function via context, this is an async function that returns a Promise
        if(password === confirmPassword){

          context.data.createUser(user)
          // if the promise is an array of errors, set the errors state of this class to the array
            .then( errors => {
                if(errors.length){
                  console.log(errors);
                    this.setState( { errors } );
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push('/');
                        });
                  }
            })
            // handle rejected promises
            .catch(err => {
                this.props.history.push('/error'); // push to history stack

            });
            
        } else {
            this.setState(  { errors: [ passwordError ] } );
        }


  }

  cancel = () => {
    this.props.history.push('/');

  }
}
