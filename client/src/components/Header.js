import React from 'react';
import { NavLink } from 'react-router-dom';


// Stateless header component to render header with "Sign In" and "Sign Out" links
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
                            <NavLink to="/signout">Sign Out</NavLink>
                        </React.Fragment>

                    : // else render the header with the sign up and sign out Navlinks
                
                        <React.Fragment>
                            <NavLink className="signup" to="/signup">Sign Up</NavLink>
                            <NavLink className="signin" to="/signin">Sign In</NavLink>
                        </React.Fragment>
                }
                </nav>
              </div>
            </div>
        )
    }

}