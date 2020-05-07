import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Account from './Account/Account';
import Main from './Main/Main';
import Admin from './Admin/Admin';

// eslint-disable-next-line no-unused-vars
const Dashboard = (props) => {
   return (
      <div className="container-fluid">
         <div className="row d-flex justify-content-between">
            <div
               className="col mt-4"
               style={{ minWidth: '298px', minHeight: '480px' }}
            >
               <Switch>
                  <Route exact path="/store" component={Main} />
                  <Route exact path="/store/admin" component={Admin} />
                  <Route exact path="/store/account" component={Account} />
               </Switch>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
