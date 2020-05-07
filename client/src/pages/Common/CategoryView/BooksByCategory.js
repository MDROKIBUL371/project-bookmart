import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { searchByCategroy } from 'store/actions/searchActions';
import { clearBooks } from 'store/actions/booksActions';
import Fragment from 'hoc/Fragment';
import BookDisplayCard from 'pages/Common/Books/BookDisplayCard';

class BooksByCategory extends Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
         name: '',
      };
   }

   componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      const { id } = this.props.match.params;
      // eslint-disable-next-line react/destructuring-assignment
      this.props.searchByCategroy(id);
      this.setState(
         {
            id,
         },
         () => this.setCategoryName()
      );
   }

   componentWillUnmount() {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.clearBooks();
   }

   setCategoryName = () => {
      const { categories } = this.props;
      const { id } = this.state;
      if (categories.length > 0) {
         let category;
         for (let i = 0; i < categories.length; i += 1) {
            category = categories[i];
            // eslint-disable-next-line no-underscore-dangle
            if (category._id === id) {
               this.setState({
                  name: category.name,
               });
            }
         }
      } else {
         this.setState({
            name: id,
         });
      }
   };

   render() {
      const { isLoading, books } = this.props;
      const { name } = this.state;

      return (
         <div className="container my-5">
            <div className="card">
               <div className="card-header">
                  <h5>
                     Category: <span className="text-success">{name}</span>
                  </h5>
               </div>
               <div className="card-body">
                  <Fragment>
                     {!isLoading && books.length === 0 ? (
                        <div>Not found</div>
                     ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                           {books.map((book) => (
                              // eslint-disable-next-line no-underscore-dangle
                              <div className="col mb-4" key={book._id}>
                                 <BookDisplayCard {...book} />
                              </div>
                           ))}
                        </div>
                     )}
                  </Fragment>
               </div>
            </div>
         </div>
      );
   }
}

BooksByCategory.propTypes = {
   searchByCategroy: PropTypes.func.isRequired,
   clearBooks: PropTypes.func.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   books: PropTypes.array.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   categories: PropTypes.array.isRequired,
   isLoading: PropTypes.bool.isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         id: PropTypes.string.isRequired,
      }),
   }).isRequired,
};

const mapStateToProps = (state) => ({
   books: state.books.books,
   categories: state.books.categories,
   isLoading: state.books.isLoading,
});

const mapDispatchToProps = {
   searchByCategroy,
   clearBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksByCategory);
