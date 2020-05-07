import React from 'react';
import PurchaseHistory from './PurchaseHistory';

const History = () => {
   return (
      <div className="col text-center">
         <div className="row mt-4">
            <div className="col">
               <div className="card text-left">
                  <div className="card-header">
                     <h3>Purchase history</h3>
                  </div>
                  <div className="card-body">
                     <h5 className="card-title">My history</h5>
                     <PurchaseHistory />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default History;
