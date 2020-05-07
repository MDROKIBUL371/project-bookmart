import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Navbar.css';

import { logout } from 'store/actions/authActions';

const Navbar = (props) => {
   const { isAuthenticated } = props;
   const GuestLinks = (
      <>
         <ul className="navbar-nav">
            <li className="nav-item">
               <NavLink className="nav-link" to="/signin">
                  Sign In
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink className="nav-link" to="/register">
                  Register
               </NavLink>
            </li>
         </ul>
      </>
   );
   const AuthLinks = () => {
      const { user, logoutUser } = props;
      return (
         <>
            <ul className="navbar-nav">
               <li className="nav-item">
                  {isAuthenticated ? (
                     <NavLink className="nav-link" to="/store">
                        Store
                     </NavLink>
                  ) : (
                     <NavLink className="nav-link" to="/">
                        Home
                     </NavLink>
                  )}
               </li>
               <li className="nav-item">
                  {isAuthenticated ? (
                     <NavLink className="nav-link" to="/store/admin">
                        Admin Panel
                     </NavLink>
                  ) : null}
               </li>
               <li className="nav-item">
                  <NavLink className="nav-link" to="/store/account">
                     {user.username}
                  </NavLink>
               </li>
            </ul>
            <span className="ml-auto">
               {/* eslint-disable-next-line react/destructuring-assignment */}
               <button
                  type="button"
                  className="btn btn-md btn-light p-2"
                  onClick={logoutUser}
               >
                  Sign Out
               </button>
            </span>
         </>
      );
   };

   return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-info">
         <NavLink className="navbar-brand" to="/">
            <h3>BookMart</h3>
         </NavLink>
         <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#coolNavbar"
            aria-controls="coolNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
         >
            <span className="navbar-toggler-icon" />
         </button>
         <div className="collapse navbar-collapse" id="coolNavbar">
            {isAuthenticated ? <AuthLinks /> : GuestLinks}
         </div>
      </nav>
   );
};

Navbar.defaultProps = {
   user: {
      username: undefined,
   },
};

Navbar.propTypes = {
   user: PropTypes.shape({
      username: PropTypes.string,
   }),
   isAuthenticated: PropTypes.bool.isRequired,
   // eslint-disable-next-line react/no-unused-prop-types
   logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
   };
};

const mapDispatchToProps = {
   logoutUser: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
