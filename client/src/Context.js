// File to utilize and manipulate the data from Date.js

import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data(); // initialize new instance of the Data class
  }


  render() {

    const { authenticatedUser } = this.state; //extract authenticatedUser from state
    
    // create a value object to provide the utility methods of the class to Data
    const value = { 
      authenticatedUser,
      data: this.data,
      actions: {
          signIn: this.signIn,
          signOut: this.signOut
      } // It's common to pass the Provider's value prop an actions 
      //object to store any event handlers or actions you want to perform on data that's passed down through context
      
    };

    return ( // provide application state to share between components
      // pass context to the Provider via the "value" prop
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (username, password) => {
      const user = await this.data.getUser(username, password); // the returned promise would be an object
      if(user !== null){
        this.setState(() => {
          return {
            authenticatedUser: user, // If the value of user is not null, update the authenticatedUser state to the value of user
          };
        });
        // first argument passed to Cookies.set() specifies the name of the cookie to set
        // second value specifies the value you want to store in the cookie
        // pass the last argument to set additional cookie options, for example an expiration
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 } ); // cookie expires in 1 day
      }
      return user;
    }

  signOut = () => {
    this.setState(() => {
      
      return {
      authenticatedUser: null, // set authUser back to null
      };
    }); 
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 // this function automatically subscribes the component passed to it to all actions and changes
export default function withContext(Component) {
  return function ContextComponent(props) {

    //higher order function the wraps provided component in a Context.Consumer component
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}