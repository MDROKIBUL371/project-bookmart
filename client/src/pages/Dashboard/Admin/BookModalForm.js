import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateBook, createBook } from 'store/actions/booksActions';

class BookModalForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         book: {},
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { book: bookProp } = nextProps;
      const { book } = prevState;
      if (book !== bookProp) {
         return {
            book: {
               ...book,
            },
         };
      }
      return prevState;
   }

   inputChangeHanlder = (e) => {
      e.preventDefault();
      const { book } = this.state;
      this.setState({
         book: {
            ...book,
            [e.target.id]: e.target.value,
         },
      });
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const { book } = this.state;
      const { book: bookProps, isNew } = this.props;
      const newBook = {
         ...bookProps,
         ...book,
      };
      if (isNew && !Object.prototype.hasOwnProperty.call(newBook, '_id')) {
         // eslint-disable-next-line react/destructuring-assignment
         this.props.createBook(newBook);
      } else {
         // eslint-disable-next-line react/destructuring-assignment
         this.props.updateBook(newBook);
      }
      setTimeout(() => {
         window.location.reload();
      }, 1000);
   };

   render() {
      const { book } = this.props;
      const {
         title,
         subtitle,
         description,
         category,
         author,
         image,
         year,
         price,
         rating,
      } = book;
      const { categories } = this.props;
      return (
         <>
            <div
               className="modal fade"
               id="bookUpsertModel"
               tabIndex="-1"
               role="dialog"
               aria-labelledby="bookUpsertModelLabel"
               aria-hidden="true"
            >
               <div className="modal-dialog" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="bookUpsertModelLabel">
                           {title !== '' ? (
                              <span>Update Book</span>
                           ) : (
                              <span>Create New Book</span>
                           )}
                        </h5>
                        <button
                           type="button"
                           className="close"
                           data-dismiss="modal"
                           aria-label="Close"
                        >
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                           <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="title"
                                 placeholder="Book Title"
                                 defaultValue={title}
                                 onChange={this.inputChangeHanlder}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="subtitle">Subtitle</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="subtitle"
                                 placeholder="Book Subtitle"
                                 defaultValue={subtitle}
                                 onChange={this.inputChangeHanlder}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="author">Author</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="author"
                                 placeholder="Author"
                                 defaultValue={author}
                                 onChange={this.inputChangeHanlder}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="description">Description</label>
                              <textarea
                                 className="form-control"
                                 id="description"
                                 rows="3"
                                 defaultValue={description}
                                 onChange={this.inputChangeHanlder}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="category">Category</label>
                              <select
                                 className="form-control"
                                 id="category"
                                 disabled={false}
                                 onChange={this.inputChangeHanlder}
                                 onBlur={this.inputChangeHanlder}
                                 value={category}
                                 defaultValue={category}
                              >
                                 {categories.map((cat) => (
                                    // eslint-disable-next-line no-underscore-dangle
                                    <option key={cat._id} value={cat._id}>
                                       {cat.name}
                                    </option>
                                 ))}
                              </select>
                           </div>
                           <div className="form-group">
                              <label htmlFor="image">Image Url</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="image"
                                 placeholder="Image Url"
                                 defaultValue={image}
                                 onChange={this.inputChangeHanlder}
                              />
                           </div>
                           <div className="form-row">
                              <div className="col-md-6">
                                 <label htmlFor="rating">Rating</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    id="rating"
                                    placeholder="Rating"
                                    defaultValue={rating}
                                    onChange={this.inputChangeHanlder}
                                 />
                              </div>
                              <div className="col-md-6">
                                 <label htmlFor="price">Price</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    placeholder="Price"
                                    defaultValue={price}
                                    onChange={this.inputChangeHanlder}
                                 />
                              </div>
                           </div>
                           <div className="form-group">
                              <label htmlFor="year">Year</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="year"
                                 placeholder="Year"
                                 defaultValue={year}
                                 onChange={this.inputChangeHanlder}
                              />
                           </div>
                        </form>
                     </div>
                     <div className="modal-footer">
                        <button
                           type="button"
                           className="btn btn-secondary"
                           data-dismiss="modal"
                        >
                           Close
                        </button>
                        <button
                           type="submit"
                           className="btn btn-primary"
                           onClick={this.handleSubmit}
                        >
                           Save changes
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   }
}

BookModalForm.propTypes = {
   isNew: PropTypes.bool.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   book: PropTypes.object.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   categories: PropTypes.array.isRequired,
   createBook: PropTypes.func.isRequired,
   updateBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   categories: state.books.categories,
});

const mapDispatchToProps = {
   updateBook,
   createBook,
};

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(BookModalForm)
);
