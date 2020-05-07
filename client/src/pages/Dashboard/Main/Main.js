import React from 'react';

import { connect } from 'react-redux';
import SearchBar from 'pages/Home/SearchBar';
import BooksDisplay from 'pages/Common/Books/BooksDisplay';
import Sidebar from '../Sidebar/Sidebar';

const Main = () => (
   <div className="col">
      <div className="row">
         <div className="col-md-12">
            <div className="card">
               <div className="card-header">
                  <SearchBar />
               </div>
               <div className="card-body">
                  <div className="row">
                     <div className="col-md-2 my-3">
                        <Sidebar />
                     </div>
                     <div className="col col-md-10 my-3">
                        <BooksDisplay />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
);

const mapStateToProps = (state) => {
   return {
      tick: state.tick,
   };
};

export default connect(mapStateToProps, {})(Main);
