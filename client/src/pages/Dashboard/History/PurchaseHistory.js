import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const PurchaseHistory = (props) => {
   const { isLoading, user } = props;
   const { purchasedBooks } = user;
   if (isLoading) {
      return <div className="text-info">Loading...</div>;
   }
   return (
      <div>
         {purchasedBooks !== undefined &&
         !isLoading &&
         purchasedBooks.length !== 0 ? (
            <table className="table table-bordered table-hover">
               <thead className="text-info">
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Title</th>
                     <th scope="col">Price</th>
                     <th scope="col">Rating</th>
                  </tr>
               </thead>
               <tbody>
                  {purchasedBooks.map((book, index) => (
                     // eslint-disable-next-line no-underscore-dangle
                     <tr key={book._id}>
                        <th scope="row">
                           <div>{index}</div>
                        </th>
                        <td>
                           <div>{book.title}</div>
                        </td>
                        <td>
                           <div>{book.price}</div>
                        </td>
                        <td>
                           <div>{book.rating}</div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         ) : (
            <div>No data</div>
         )}
      </div>
   );
};

PurchaseHistory.defaultProps = {
   user: {},
};

PurchaseHistory.propTypes = {
   isLoading: propTypes.bool.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   user: propTypes.object,
};

const mapStateToProps = (state) => {
   return {
      user: state.auth.user,
      isLoading: state.auth.isLoading,
   };
};

export default connect(mapStateToProps)(PurchaseHistory);
