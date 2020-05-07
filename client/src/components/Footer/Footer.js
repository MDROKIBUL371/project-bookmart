import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
   return (
      <footer className="footer bg-info mt-auto py-3">
         <div className="container text-left">
            <div className="row">
               <div className="col-md-6">
                  <p>
                     We have a large database of book collections and you can
                     access all of it once you signed up as a member.
                  </p>
                  <span className="text-center text-muted">
                     <small>@BookMart</small>
                  </span>
               </div>
               <div className="col-md-6 text-center">
                  <h5>Stay in touch with us</h5>
                  <ul className="list-inline">
                     <NavLink className="list-inline-item text-dark" to="/">
                        BookMart
                     </NavLink>
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
