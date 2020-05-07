import React from 'react';
import BooksDisplay from 'pages/Common/Books/BooksDisplay';
import Sidebar from 'pages/Dashboard/Sidebar/Sidebar';
import SearchBar from './SearchBar';

// eslint-disable-next-line no-unused-vars
const Home = (props) => {
   return (
      <div className="container mt-5">
         <div className="row m-3">
            <SearchBar />
         </div>
         <div className="row m-1">
            <div className="col-md-2 my-3">
               <Sidebar />
            </div>
            <div className="col col-md-10 my-3">
               <BooksDisplay />
            </div>
         </div>
      </div>
   );
};

export default Home;
