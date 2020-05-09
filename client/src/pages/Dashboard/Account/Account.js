import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import moment from 'moment';
import PurchaseHistory from '../History/PurchaseHistory';

const Account = (props) => {
   const { user, isLoading } = props;
   return (
      <div className="container">
         <div className="row">
            <div className="col-md-4 mb-3">
               <div className="card">
                  <div className="card-header">My Account</div>
                  {!isLoading &&
                  Object.prototype.hasOwnProperty.call(user, 'name') ? (
                     <div className="card-body text-left">
                        <h5 className="card-title">
                           Book Store User ({user.username})
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                           Created: {moment(user.registeredDate).fromNow()}
                        </h6>
                        <form>
                           <div className="form-group">
                              <label htmlFor="nameInput">Name</label>
                              <input
                                 disabled
                                 type="text"
                                 className="form-control"
                                 id="nameInput"
                                 placeholder="Name"
                                 value={user.name}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                 disabled
                                 type="text"
                                 className="form-control"
                                 id="email"
                                 placeholder="Email"
                                 value={user.email}
                              />
                           </div>
                        </form>
                     </div>
                  ) : (
                     <div className="card-body">User not authorized</div>
                  )}
               </div>
            </div>
            <div className="col">
               <div className="card">
                  <div className="card-header">My Purchases</div>
                  <div className="card-body">
                     <PurchaseHistory />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

Account.defaultProps = {
   user: {},
};

Account.propTypes = {
   // eslint-disable-next-line react/forbid-prop-types
   user: PropTypes.object,
   isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
   user: state.auth.user,
   isLoading: state.auth.isLoading,
});

export default withRouter(connect(mapStateToProps)(Account));
