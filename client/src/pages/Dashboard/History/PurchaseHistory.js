import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const PurchaseHistory = (props) => {
   console.log(props);
   const { isLoading } = props;
   if (isLoading) {
      return <div className="text-info">Loading...</div>;
   }
   return (
      <table className="table table-bordered table-hover">
         <thead className="text-info">
            <tr>
               <th scope="col">#</th>
               <th scope="col">Action</th>
               <th scope="col">Date & Time</th>
               <th scope="col">IP Address</th>
               <th scope="col">Browser Environment</th>
            </tr>
         </thead>
         <tbody>
            <tr key={new Date().toISOString()}>
               <th scope="row">{1 + 1}</th>
               <td>AAAA</td>
               <td>BBBB</td>
               <td>CCCC</td>
            </tr>
            );
         </tbody>
      </table>
   );
};

PurchaseHistory.propTypes = {
   isLoading: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
   return {
      isLoading: state.auth.isLoading,
   };
};

export default connect(mapStateToProps)(PurchaseHistory);
