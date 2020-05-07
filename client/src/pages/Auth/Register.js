import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { register } from 'store/actions/authActions';
import { SHOW_ERROR } from 'store/actions/actionTypes';

class Register extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: {
            username: {
               value: '',
               valid: false,
            },
            email: {
               value: '',
               valid: false,
            },
            name: {
               value: '',
               valid: true,
            },
            password: {
               value: '',
               valid: false,
            },
            password2: {
               value: '',
               valid: false,
            },
         },
         formValidity: false,
         password1Error: true,
         password2Error: true,
      };
   }

   // triggered on change of states
   inputChangedHandler = (event) => {
      const { user } = this.state;
      const updatedUser = {
         ...user,
      };
      const updatedFormElement = {
         ...updatedUser[event.target.id],
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.validateField(
         event.target.id,
         updatedFormElement.value
      );
      updatedUser[event.target.id] = updatedFormElement;
      this.setState({
         user: updatedUser,
      });
   };

   validateField = (id, value) => {
      const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const { user } = this.state;
      switch (id) {
         case 'email':
            return emailTest.test(value);
         case 'password':
            if (value.length >= 8) {
               this.setState({
                  password1Error: false,
               });
               return true;
            }
            this.setState({
               password1Error: true,
            });

            return false;
         case 'password2':
            if (user.password.value === value) {
               this.setState({
                  password2Error: false,
               });
               return true;
            }
            this.setState({
               password2Error: true,
            });

            return false;
         case 'username':
            return value.trim() !== '';
         default:
            return true;
      }
   };

   // triggered on Submit
   handleSubmit = (event) => {
      event.preventDefault();
      let validity = true;
      const { user } = this.state;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in user) {
         if (Object.prototype.hasOwnProperty.call(user, key)) {
            validity = validity && user[key].valid;
         }
      }
      this.setState(
         {
            formValidity: validity,
         },
         () => {
            const { formValidity } = this.state;
            if (formValidity) {
               const registerUser = {
                  username: user.username.value,
                  email: user.email.value,
                  name: user.name.value,
                  password: user.password.value,
               };
               // eslint-disable-next-line react/destructuring-assignment
               this.props.register(registerUser);
            }
         }
      );
   };

   render() {
      const { isAuthenticated } = this.props;
      const { user, password1Error, password2Error } = this.state;
      if (isAuthenticated) {
         return <Redirect to="/store" />;
      }
      return (
         <div className="container mb-4 mt-5">
            <div className="row no-gutters justify-content-center">
               <div className="col-md-6">
                  <h3 className="mb-4">
                     Register for an account to trade on Binary.com platform
                  </h3>
                  <p>
                     You can use the automation system of foxbinary with a valid
                     user account.
                  </p>
                  <small>
                     If you already have an account,{' '}
                     <Link to="/signin">login</Link> instead.
                  </small>
                  <br />
                  <br />
                  <form onSubmit={this.handleSubmit} className="text-left">
                     <div className="form-row">
                        <div className="form-group col-md-6">
                           <label htmlFor="name">First Name</label>
                           <input
                              type="text"
                              className="form-control"
                              id="name"
                              aria-describedby="firstNameHelp"
                              placeholder="First Name"
                              onChange={this.inputChangedHandler}
                              value={user.name.value}
                           />
                           <small
                              id="firstNameHelp"
                              className="form-text text-primary"
                           >
                              *optional
                           </small>
                        </div>
                        <div className="form-group col-md-6">
                           <label htmlFor="username">Username</label>
                           <input
                              type="text"
                              className="form-control"
                              id="username"
                              aria-describedby="userNameHelp"
                              placeholder="Username"
                              onChange={this.inputChangedHandler}
                              value={user.username.value}
                           />
                           <small
                              id="userNameHelp"
                              className="form-text text-muted"
                           >
                              Your username should be unique.
                           </small>
                        </div>
                     </div>
                     <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                           type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           onChange={this.inputChangedHandler}
                           value={user.email.value}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                           We&apos;ll never share your email with anyone else.
                        </small>
                     </div>
                     <div className="form-row">
                        <div className="form-group col-md-6">
                           <label htmlFor="password">Password</label>
                           <input
                              type="password"
                              className="form-control"
                              id="password"
                              aria-describedby="passwordHelp"
                              placeholder="Password"
                              onChange={this.inputChangedHandler}
                              value={user.password.value}
                           />
                           {password1Error ? (
                              <small
                                 id="passwordHelp"
                                 className="form-text text-warning"
                              >
                                 Your password should be at least of 8
                                 characters length.
                              </small>
                           ) : null}
                        </div>

                        <div className="form-group col-md-6">
                           <label htmlFor="password2">Confirm Password</label>
                           <input
                              type="password"
                              className="form-control"
                              id="password2"
                              aria-describedby="confirmPasswordHelp"
                              placeholder="Re-type Password"
                              onChange={this.inputChangedHandler}
                              value={user.password2.value}
                           />
                           {password2Error ? (
                              <small
                                 id="confirmPasswordHelp"
                                 className="form-text text-warning"
                              >
                                 Passwords should be matched.
                              </small>
                           ) : null}
                        </div>
                     </div>
                     <div className="mt-4 mb-3 text-center">
                        <button type="submit" className="btn btn-primary">
                           Register
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}
Register.propTypes = {
   register: propTypes.func.isRequired,
   isAuthenticated: propTypes.bool.isRequired,
};
const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.auth.isAuthenticated,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      alert: (msg) =>
         dispatch({ type: SHOW_ERROR, payload: { msg, status: null } }),
      register: (user) => dispatch(register(user)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
