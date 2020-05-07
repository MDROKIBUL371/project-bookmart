import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { fetchAllBooks } from 'store/actions/booksActions';
import BookDisplayCard from './BookDisplayCard';

const Loader = () => <div>Loading...</div>;

class BooksDisplay extends Component {
   componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.fetchAllBooks();
   }

   render() {
      const { isLoading, books } = this.props;
      return (
         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {isLoading ? (
               <Loader />
            ) : (
               books.map((book) => (
                  // eslint-disable-next-line no-underscore-dangle
                  <div className="col mb-4" key={book._id}>
                     <BookDisplayCard {...book} />
                  </div>
               ))
            )}
         </div>
      );
   }
}

BookDisplayCard.defaultProps = {
   books: [],
   isLoading: false,
};

BooksDisplay.propTypes = {
   fetchAllBooks: PropTypes.func.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   books: PropTypes.any.isRequired,
   isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
   books: state.books.books,
   isLoading: state.books.isLoading,
});

const mapDispatchToProps = {
   fetchAllBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksDisplay);
