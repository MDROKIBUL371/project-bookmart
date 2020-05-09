import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BookDisplayCard = (props) => {
   const {
      _id: id,
      title,
      subtitle,
      author,
      category,
      image,
      year,
      price,
      rating,
   } = props;
   return (
      <div className="card">
         <NavLink to={`/bk/item/${id}`}>
            <img src={image} className="card-img-top" alt={`${title}`} />
         </NavLink>
         <div className="card-body text-left">
            <h5 className="card-title text-primary">
               {title}
               <small className="ml-2">
                  {' '}
                  by <span className="text-warning">{author}</span>
               </small>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
               {subtitle}
               <span className="ml-2 text-info">[{year}]</span>
            </h6>
            <div className="row mb-3">
               <p className="card-subtitle text-muted mx-3">Rating: {rating}</p>
               <span className="badge badge-success">{category.name}</span>
            </div>
            <div className="m-1 justify-content-between">
               <span className="text-primary mr-4">Price: {price}$</span>
            </div>
         </div>
      </div>
   );
};

BookDisplayCard.defaultProps = {
   category: {},
};

BookDisplayCard.propTypes = {
   _id: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   subtitle: PropTypes.string.isRequired,
   author: PropTypes.string.isRequired,
   // eslint-disable-next-line react/forbid-prop-types
   category: PropTypes.any,
   image: PropTypes.string.isRequired,
   year: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   rating: PropTypes.number.isRequired,
};

export default BookDisplayCard;
