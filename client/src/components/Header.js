import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {

    render() {

        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return(

            <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                { // build out a dynamic Header that changes when a user is logged in
                    authUser ? // if user is authenticated give header a welcome span and link to sign out
                    <React.Fragment>
                        <span>Welcome, {authUser.firstName}!</span>
                        <Link to="/signout">Sign Out</Link>
                    </React.Fragment>
                    : // else render the header with the sign up and sign out links
                
                    <React.Fragment>
                        <Link className="signup" to="/signup">Sign Up</Link>
                        <Link className="signin" to="/signin">Sign In</Link>
                    </React.Fragment>
                }
                </nav>
              </div>
            </div>
        )
    }

}