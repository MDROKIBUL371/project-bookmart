import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { search } from 'store/actions/searchActions';
import { fetchAllBooks } from 'store/actions/booksActions';

class SearchBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         keyword: '',
      };
   }

   inputChangeHandler = (e) => {
      e.preventDefault();
      this.setState({
         keyword: e.target.value,
      });
   };

   submitHandler = (e) => {
      e.preventDefault();
      const { keyword } = this.state;
      if (keyword !== '') {
         // eslint-disable-next-line react/destructuring-assignment
         this.props.search(this.state);
      } else {
         // eslint-disable-next-line react/destructuring-assignment
         this.props.fetchAllBooks();
      }
   };

   render() {
      const { keyword } = this.state;
      return (
         <div className="col">
            <form onSubmit={this.submitHandler}>
               <div className="form-group">
                  <label className="control-label" htmlFor="searchBard">
                     <h3>Search</h3>
                  </label>
                  <div className="form-group">
                     <div className="input-group mb-3">
                        <div className="input-group-prepend">
                           <span className="input-group-text">
                              <i className="material-icons">search</i>
                           </span>
                        </div>
                        <input
                           type="text"
                           id="searchBard"
                           className="form-control p-1"
                           aria-label="Enter search keyword"
                           value={keyword}
                           onChange={this.inputChangeHandler}
                        />
                        <div className="input-group-append">
                           <button
                              className="btn-sm btn-info px-3"
                              type="submit"
                           >
                              Go
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      );
   }
}

SearchBar.propTypes = {
   search: PropTypes.func.isRequired,
   fetchAllBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   keyword: state.search.keyword,
   isLoading: state.search.isLoading,
});

const mapDispatchToProps = {
   search,
   fetchAllBooks,
};

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
