import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createCategory } from 'store/actions/booksActions';

class CategoryModalForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         category: {},
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { category: categoryProp } = nextProps;
      const { category } = prevState;
      if (category !== categoryProp) {
         return {
            category: {
               ...category,
            },
         };
      }
      return prevState;
   }

   inputChangeHanlder = (e) => {
      e.preventDefault();
      const { category } = this.state;
      this.setState({
         category: {
            ...category,
            [e.target.id]: e.target.value,
         },
      });
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const { category } = this.state;
      const { category: categoryProps, isNew } = this.props;
      const newBook = {
         ...categoryProps,
         ...category,
      };
      if (isNew && !Object.prototype.hasOwnProperty.call(newBook, '_id')) {
         // eslint-disable-next-line react/destructuring-assignment
         this.props.createCategory(newBook);
      }
      setTimeout(() => {
         window.location.reload();
      }, 1000);
   };

   render() {
      const { category } = this.props;
      const { name } = category;
      return (
         <>
            <div
               className="modal fade"
               id="categoryUpsertModel"
               tabIndex="-1"
               role="dialog"
               aria-labelledby="categoryUpsertModelLabel"
               aria-hidden="true"
            >
               <div className="modal-dialog" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5
                           className="modal-title"
                           id="categoryUpsertModelLabel"
                        >
                           <span>Create New Category</span>
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
                              <label htmlFor="category">Category</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="name"
                                 placeholder="Category"
                                 defaultValue={name}
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

CategoryModalForm.propTypes = {
   isNew: PropTypes.bool.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   category: PropTypes.object.isRequired,
   createCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   categories: state.books.categories,
});

const mapDispatchToProps = {
   createCategory,
};

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(CategoryModalForm)
);
