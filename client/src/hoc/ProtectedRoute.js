import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { SwapSpinner } from 'react-spinners-kit';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { getLoggedInUser } from 'store/actions/authActions';

const ProtectedRoute = ({
   isAuthenticated,
   isLoading,
   accessToken,
   component: Component,
   ...rest
}) => {
   return (
      <Route
         {...rest}
         render={(props) => {
            if (isLoading) {
               return (
                  <div className="container d-flex justify-content-center">
                     <div className="row m-5 p-5">
                        <div className="col m-5 p-5">
                           <SwapSpinner
                              size={60}
                              color="#686769"
                              loading={isLoading}
                           />
                        </div>
                     </div>
                  </div>
               );
            }
            if (!isAuthenticated && accessToken === null) {
               return <Redirect to="/signin" />;
            }
            return <Component {...props} />;
         }}
      />
   );
};

ProtectedRoute.defaultProps = {
   accessToken: undefined,
};

ProtectedRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   isLoading: PropTypes.bool.isRequired,
   accessToken: PropTypes.string,
   // eslint-disable-next-line react/forbid-prop-types
   component: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.auth.isLoading,
      accessToken: state.auth.accessToken,
   };
};

const mapDispatchToProps = {
   getLoggedInUser,
};

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
);
