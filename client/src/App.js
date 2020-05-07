import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
// Redux

import Dashboard from 'pages/Dashboard/Dashboard';
import Signin from 'pages/Auth/Signin';
import Register from 'pages/Auth/Register';
import Home from 'pages/Home/Home';
import ProtectedRoute from 'hoc/ProtectedRoute';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import Book from 'pages/Common/Book/Book';
import BooksByCategory from 'pages/Common/CategoryView/BooksByCategory';
import { getLoggedInUser } from 'store/actions/authActions';
import { connect } from 'react-redux';

class App extends Component {
   componentDidMount() {
      const { accessToken } = this.props;
      if (accessToken) {
         // eslint-disable-next-line react/destructuring-assignment
         this.props.getLoggedInUser();
      }
   }

   render() {
      return (
         <div className="App">
            <BrowserRouter>
               <Navbar />
               <main className="mt-0">
                  <ProtectedRoute path="/store" component={Dashboard} />
                  <Route path="/bk/item/:id" component={Book} />
                  <Route path="/bk/cat/:id" component={BooksByCategory} />
                  <Route path="/signin" component={Signin} />
                  <Route path="/register" component={Register} />
                  <Route exact path="/" component={Home} />
               </main>
               <Footer />
            </BrowserRouter>
         </div>
      );
   }
}

App.defaultProps = {
   accessToken: null,
};

App.propTypes = {
   accessToken: PropTypes.string,
   getLoggedInUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   accessToken: state.auth.accessToken,
});

const mapDispatchToProps = {
   getLoggedInUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
