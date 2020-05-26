import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { fetchBookById } from 'store/actions/booksActions';
import { purchaseBook } from 'store/actions/authActions';

const Loader = () => <div>Loading...</div>;

class Book extends Component {
   constructor(props) {
      super(props);
      this.state = {
         redirectToSignIn: false
      };
   }

   componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      const { id } = this.props.match.params;
      // eslint-disable-next-line react/destructuring-assignment
      this.props.fetchBookById(id);
   }

   handlePurchase = (e) => {
      e.preventDefault();
      const { isAuthenticated, book } = this.props;
      if (isAuthenticated) {
         const { _id: id } = book;
         if (id) {
            // eslint-disable-next-line react/destructuring-assignment
            this.props.purchaseBook(id);
         }
      } else {
         this.setState({
            redirectToSignIn: true
         });
         //window.location.href = '/signin';
      }
   };

   render() {
      const { book, isLoading } = this.props;
      const { redirectToSignIn } = this.state;
      if (book === {}) {
         return null;
      }
      if(redirectToSignIn === true){
        return (
            <Redirect to="/signin">
        );
      }
      return (
         <div className="container my-5">
            <div className="card" style={{ width: '18rem' }}>
               {isLoading && book === {} ? (
                  <Loader />
               ) : (
                  <>
                     <img
                        src={book.image}
                        className="card-img-top"
                        alt={`${book.title}`}
                     />
                     <div className="card-body text-left">
                        <h5 className="card-title text-primary">
                           {book.title}
                           <small className="ml-2">
                              {' '}
                              by{' '}
                              <span className="text-warning">
                                 {book.author}
                              </span>
                           </small>
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                           {book.subtitle}
                           <span className="ml-2 text-info">[{book.year}]</span>
                        </h6>
                        <p className="card-text text-primary">
                           {book.description}
                        </p>
                        <div className="row justify-content-between p-3">
                           <h5 className="card-subtitle mr-2 text-muted">
                              Rating: {book.rating}
                           </h5>
                           <span className="badge badge-success p-2">
                              {book.category && book.category.name
                                 ? book.category.name
                                 : ''}
                           </span>
                        </div>
                        <div className="m-1">
                           <span className="text-primary mr-5">
                              <p>Price: {book.price}$</p>
                           </span>
                           <button
                              type="button"
                              className="btn-sm btn-primary"
                              onClick={this.handlePurchase}
                           >
                              Purchase
                           </button>
                        </div>
                        <p className="card-text">
                           <small className="text-muted">
                              Last updated {moment(book.modified).fromNow()}
                           </small>
                        </p>
                     </div>
                  </>
               )}
            </div>
         </div>
      );
   }
}

Book.defaultProps = {
   book: {},
   match: {}
};

Book.propTypes = {
   match: PropTypes.shape({
      params: PropTypes.shape({
         id: PropTypes.string.isRequired,
      }),
   }),
   book: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      author: PropTypes.string,
      category: PropTypes.shape({
         name: PropTypes.string,
         created: PropTypes.string,
      }),
      image: PropTypes.string,
      year: PropTypes.string,
      price: PropTypes.number,
      rating: PropTypes.number,
      modified: PropTypes.string,
   }),
   isLoading: PropTypes.bool.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
   fetchBookById: PropTypes.func.isRequired,
   purchaseBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   book: state.books.book,
   isLoading: state.books.isLoading,
   isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
   fetchBookById,
   purchaseBook,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Book));
