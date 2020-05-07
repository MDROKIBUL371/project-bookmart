import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { fetchCategories } from 'store/actions/booksActions';
import Fragment from 'hoc/Fragment';

class Sidebar extends Component {
   componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.fetchCategories();
   }

   render() {
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
               <ul className="list-group">
                  {categories.length > 0 &&
                     categories.map((category) => (
                        <li
                           className="p-1 list-group-item"
                           key={category.created}
                        >
                           <NavLink
                              className="nav-link"
                              exact
                              // eslint-disable-next-line no-underscore-dangle
                              to={`/bk/cat/${category._id}`}
                           >
                              {category.name}
                           </NavLink>
                        </li>
                     ))}
               </ul>
            </div>
         </Fragment>
      );
   }
}

Sidebar.defaultProps = {
   categories: [],
};

Sidebar.propTypes = {
   // eslint-disable-next-line react/forbid-prop-types
   categories: PropTypes.array,
   categoriesLoading: PropTypes.bool.isRequired,
   fetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   categories: state.books.categories,
   categoriesLoading: state.books.categoriesLoading,
});

const mapDispatchToProps = {
   fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
