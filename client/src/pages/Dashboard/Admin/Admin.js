import React from 'react';
import BookAdmin from './BookAdmin';
import CategoryAdmin from './CategoryAdmin';

// eslint-disable-next-line no-unused-vars
const Admin = (props) => {
   return (
      <div className="col">
         <div className="row">
            <div className="col-md-12">
               <div className="card">
                  <div className="card-header">
                     <h4>Admin Panel</h4>
                  </div>
                  <div className="card-body">
                     <div className="row">
                        <div className="col-md-4 my-3">
                           <CategoryAdmin />
                        </div>
                        <div className="col col-md-8 my-3">
                           <BookAdmin />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Admin;
