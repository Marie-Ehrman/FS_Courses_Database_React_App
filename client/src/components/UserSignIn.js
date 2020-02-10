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
                <input autoFocus
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  className=""
                  onChange={this.change} 
                  placeholder="Email"
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
    //access context via props
    const { context } = this.props;
    
    // 
    const { from } = this.props.location.state 
       || { from: { pathname: '/courses/create' } }
       || { from: { pathname: '/courses/:id/update' } };


    // destructure state variables
    const { emailAddress, password } = this.state;

    // access signIn function via props context
    context.actions.signIn(emailAddress, password)
        .then( user => {
          // if user is null set errors state to an array holding an error message
            if(user === null){
                  this.setState(() => {
                      return { errors: [ {message:'Sign-in was unsuccessful. Please enter credentials'} ] }
                  });
                  console.log(this.state.errors);
            } else { // else navigate authenticated user to home screen
              this.props.history.push(from);
              console.log(`SUCCESS, ${emailAddress} is now signed in`);
           }
        })
        .catch(err => { // handle a rejected Promise
            console.log(err);
            this.props.history.push('/error'); // navigate user to error route in case of error
        })



  }

  cancel = () => {
    this.props.history.push('/');
  }
}
