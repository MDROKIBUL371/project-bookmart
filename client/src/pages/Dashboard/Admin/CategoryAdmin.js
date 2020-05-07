import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { fetchCategories, deleteCategory } from 'store/actions/booksActions';
import Fragment from 'hoc/Fragment';
import CategoryModalForm from './CategoryModalForm';

class CategoryAdmin extends Component {
   constructor(props) {
      super(props);
      this.state = {
         categoryUpsertModal: {
            display: false,
            isNew: false,
            category: {},
         },
      };
   }

   componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.fetchCategories();
   }

   resolveCategory = (id) => {
      const { categories } = this.props;
      let category = {};
      for (let i = 0; i < categories.length; i += 1) {
         category = categories[i];
         if (Object.prototype.hasOwnProperty.call(category, '_id')) {
            // eslint-disable-next-line no-underscore-dangle
            if (category._id === id) {
               return category;
            }
         }
      }
      return category;
   };

   displayCategoryEditModal = (id) => {
      const { categoryUpsertModal } = this.state;
      if (id === null) {
         this.setState({
            categoryUpsertModal: {
               category: {},
               isNew: true,
               display: !categoryUpsertModal.display,
            },
         });
      } else {
         this.setState({
            categoryUpsertModal: {
               ...categoryUpsertModal,
               category: this.resolveCategory(id),
               display: !categoryUpsertModal.display,
            },
         });
      }
   };

   deleteCategory = (id) => {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.deleteCategory(id);
      setTimeout(() => {
         window.location.reload();
      }, 1000);
   };

   render() {
      const { categoryUpsertModal } = this.state;
      const { categoriesLoading, categories } = this.props;
      if (categoriesLoading) {
         return <div>Please wait...</div>;
      }
      if (!categoriesLoading && categories === []) {
         return <div>Categories unavailable...</div>;
      }
      return (
         <Fragment>
            <div className="px-0 d-md-block sidebar text-left">
               <div className="row mb-3">
                  <div className="mx-3">
                     <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        data-toggle="modal"
                        data-target="#categoryUpsertModel"
                        onClick={() => this.displayCategoryEditModal(null)}
                     >
                        New Category
                     </button>
                  </div>
               </div>
               <CategoryModalForm {...categoryUpsertModal} />
               <ul className="list-group">
                  {categories.length > 0 &&
                     categories.map((category) => (
                        <li
                           className="p-1 list-group-item"
                           key={category.created}
                        >
                           <div className="row">
                              <div className="col">
                                 <NavLink
                                    className="nav-link"
                                    exact
                                    // eslint-disable-next-line no-underscore-dangle
                                    to={`/bk/cat/${category._id}`}
                                 >
                                    {category.name}
                                 </NavLink>
                              </div>
                              <div className="col-4">
                                 <button
                                    type="button"
                                    className="btn btn-danger btn-sm mx-3 p-0"
                                    onClick={() =>
                                       // eslint-disable-next-line no-underscore-dangle
                                       this.deleteCategory(category._id)
                                    }
                                 >
                                    <span className="material-icons px-1 mt-1">
                                       clear
                                    </span>
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
               </ul>
            </div>
         </Fragment>
      );
   }
}

CategoryAdmin.defaultProps = {
   categories: [],
};

CategoryAdmin.propTypes = {
   // eslint-disable-next-line react/forbid-prop-types
   categories: PropTypes.array,
   categoriesLoading: PropTypes.bool.isRequired,
   fetchCategories: PropTypes.func.isRequired,
   deleteCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   categories: state.books.categories,
   categoriesLoading: state.books.categoriesLoading,
});

const mapDispatchToProps = {
   fetchCategories,
   deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdmin);
