import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { WhisperSpinner } from 'react-spinners-kit';
import { login } from 'store/actions/authActions';

class Signin extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
      };
   }

   componentDidMount() {
      const { accessToken } = this.props;
      if (accessToken) {
         window.location.href = '/store';
      }
   }

   inputChangeHandler = (e) => {
      this.setState({
         [e.target.id]: e.target.value,
      });
   };

   onSubmitHandler = (e) => {
      e.preventDefault();
      const { email, password } = this.state;
      if (email.length > 5 && password.length > 2) {
         // eslint-disable-next-line react/destructuring-assignment
         this.props.login({ email, password });
      }
   };

   render() {
      const { email, password } = this.state;
      const { isAuthenticated, isLoading, error } = this.props;
      let errorText = null;
      if (Object.prototype.hasOwnProperty.call(error, 'status')) {
         if (error.status === 400) {
            errorText = 'ERROR!';
         }
      }
      if (isAuthenticated && !isLoading) {
         return <Redirect to="/store" />;
      }

      return (
         <div className="container mt-5 text-center col-lg-8 mb-4 pb-5">
            <div className="card bg-light">
               <div className="row no-gutters">
                  <div className="col-md-6">
                     <img
                        src="assets/images/novel-books.jpg"
                        className="card-img"
                        alt="business_image"
                        style={{ height: '100%' }}
                     />
                  </div>
                  <div className="col-md-6">
                     <div className="card-header pt-4">
                        <h5>Login to use the book store</h5>
                     </div>
                     <div className="card-body">
                        {isLoading ? (
                           <div className="col my-5 py-5 d-flex justify-content-center">
                              <WhisperSpinner
                                 size={50}
                                 color="#126246f"
                                 loading={!isLoading}
                              />
                           </div>
                        ) : (
                           <form
                              className="text-left"
                              onSubmit={this.onSubmitHandler}
                           >
                              <div className="form-group">
                                 <label htmlFor="email">Email</label>
                                 {errorText !== null ? (
                                    <>
                                       <input
                                          type="email"
                                          className="form-control is-invalid"
                                          id="email"
                                          aria-describedby="emailHelp"
                                          placeholder="Email"
                                          onChange={this.inputChangeHandler}
                                          value={email}
                                       />
                                       <div className="invalid-feedback">
                                          Invalid email or password
                                       </div>
                                    </>
                                 ) : (
                                    <input
                                       type="email"
                                       className="form-control"
                                       id="email"
                                       aria-describedby="emailHelp"
                                       placeholder="Email"
                                       onChange={this.inputChangeHandler}
                                       value={email}
                                    />
                                 )}
                              </div>
                              <div className="form-group">
                                 <label htmlFor="password">Password</label>
                                 {errorText !== null ? (
                                    <>
                                       <input
                                          type="password"
                                          className="form-control is-invalid"
                                          id="password"
                                          placeholder="Password"
                                          onChange={this.inputChangeHandler}
                                          value={password}
                                       />
                                       <div className="invalid-feedback">
                                          Invalid email or password
                                       </div>
                                    </>
                                 ) : (
                                    <input
                                       type="password"
                                       className="form-control"
                                       id="password"
                                       placeholder="Password"
                                       onChange={this.inputChangeHandler}
                                       value={password}
                                    />
                                 )}
                              </div>
                              <div className="form-group text-center">
                                 <button
                                    type="submit"
                                    className="btn btn-primary"
                                 >
                                    SIGN IN
                                 </button>
                              </div>
                           </form>
                        )}

                        <div className="col">
                           <small className="card-text">
                              If you do not have an account, please{' '}
                              <Link to="/register">register</Link> first.
                           </small>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

Signin.defaultProps = {
   error: {},
   accessToken: null,
};

Signin.propTypes = {
   login: propTypes.func.isRequired,
   isAuthenticated: propTypes.bool.isRequired,
   accessToken: propTypes.string,
   isLoading: propTypes.bool.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   error: propTypes.any,
};

const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.auth.isAuthenticated,
      accessToken: state.auth.accessToken,
      isLoading: state.auth.isLoading,
      error: state.error.error,
   };
};

const mapDispatchToProps = {
   login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
