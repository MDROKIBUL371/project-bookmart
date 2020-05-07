/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import {
   fetchAllBooksWithDescriptions,
   deleteBook,
} from 'store/actions/booksActions';
import { NavLink } from 'react-router-dom';
import BookModalForm from './BookModalForm';

const Loader = () => <div>Loading...</div>;

class BookAdmin extends Component {
   constructor(props) {
      super(props);
      this.state = {
         bookUpsertModal: {
            display: false,
            isNew: false,
            book: {},
         },
      };
   }

   componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.fetchAllBooksWithDescriptions();
   }

   resolveBook = (id) => {
      const { books } = this.props;
      let book = {};
      for (let i = 0; i < books.length; i += 1) {
         book = books[i];
         if (Object.prototype.hasOwnProperty.call(book, '_id')) {
            if (book._id === id) {
               return book;
            }
         }
      }
      return book;
   };

   displayBookEditModal = (id) => {
      const { bookUpsertModal } = this.state;
      if (id === null) {
         this.setState({
            bookUpsertModal: {
               book: {},
               isNew: true,
               display: !bookUpsertModal.display,
            },
         });
      } else {
         this.setState({
            bookUpsertModal: {
               ...bookUpsertModal,
               book: this.resolveBook(id),
               display: !bookUpsertModal.display,
            },
         });
      }
   };

   deleteBook = (id) => {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.deleteBook(id);
      setTimeout(() => {
         window.location.reload();
      }, 1000);
   };

   render() {
      const { bookUpsertModal } = this.state;
      const { isLoading, books } = this.props;
      return (
         <div className="list-group text-left">
            <div className="row mb-3">
               <div className="mx-3">
                  <button
                     type="button"
                     className="btn btn-sm btn-primary"
                     data-toggle="modal"
                     data-target="#bookUpsertModel"
                     onClick={() => this.displayBookEditModal(null)}
                  >
                     New Book
                  </button>
               </div>
            </div>
            <BookModalForm {...bookUpsertModal} />
            {isLoading ? (
               <Loader />
            ) : (
               books.map((book) => (
                  <div
                     key={book._id}
                     className="list-group-item list-group-item-action row justify-content-between"
                  >
                     <div className="row justify-content-between">
                        <div className="col-5">
                           <NavLink
                              to={`/bk/item/${book._id}`}
                              className="text-info"
                           >
                              {book.title}
                           </NavLink>
                        </div>
                        <div className="col-3">
                           <button
                              type="button"
                              className="btn btn-info mx-3 p-0"
                              data-toggle="modal"
                              data-target="#bookUpsertModel"
                              onClick={() =>
                                 this.displayBookEditModal(book._id)
                              }
                           >
                              <span className="material-icons px-1 mt-1">
                                 create
                              </span>
                           </button>
                           <button
                              type="button"
                              className="btn btn-danger btn-sm mx-3 p-0"
                              onClick={() => this.deleteBook(book._id)}
                           >
                              <span className="material-icons px-1 mt-1">
                                 clear
                              </span>
                           </button>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      );
   }
}

BookAdmin.defaultProps = {
   books: [],
   categories: [],
};

BookAdmin.propTypes = {
   fetchAllBooksWithDescriptions: PropTypes.func.isRequired,
   deleteBook: PropTypes.func.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   books: PropTypes.array,
   // eslint-disable-next-line react/forbid-prop-types
   categories: PropTypes.array,
   isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
   books: state.books.books,
   categories: state.books.categories,
   isLoading: state.books.isLoading,
});

const mapDispatchToProps = {
   fetchAllBooksWithDescriptions,
   deleteBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookAdmin);
