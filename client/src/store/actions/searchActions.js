import axios from 'axios';
import * as actionTypes from './actionTypes';

// Search Books by title
// eslint-disable-next-line import/prefer-default-export
export const search = ({ keyword }) => (dispatch) => {
   dispatch({
      type: actionTypes.SEARCH_START,
      payload: keyword,
   });
   axios
      .get(`/api/search/${keyword}`)
      .then((res) => {
         dispatch({
            type: actionTypes.SEARCH_SUCCESS,
            payload: res.data,
         });
         dispatch({
            type: actionTypes.BOOKS_FETCH_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
         };
         dispatch({
            type: actionTypes.SEARCH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Search Books by category
// eslint-disable-next-line import/prefer-default-export
export const searchByCategroy = (id) => (dispatch) => {
   dispatch({
      type: actionTypes.SEARCH_START,
      payload: id,
   });
   axios
      .get(`/api/search/category/${id}`)
      .then((res) => {
         dispatch({
            type: actionTypes.SEARCH_SUCCESS,
            payload: res.data,
         });
         dispatch({
            type: actionTypes.BOOKS_FETCH_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
         };
         dispatch({
            type: actionTypes.SEARCH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};
