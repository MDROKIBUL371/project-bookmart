import axios from 'axios';

import * as actionTypes from './actionTypes';
import { headerConfig } from './config';

// Fetch all Books
export const fetchAllBooks = () => (dispatch) => {
   dispatch({
      type: actionTypes.BOOKS_FETCH_START,
   });
   axios
      .get('/api/books')
      .then((res) => {
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
            type: actionTypes.BOOKS_FETCH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Fetch all Books with descriptions
export const fetchAllBooksWithDescriptions = () => (dispatch) => {
   dispatch({
      type: actionTypes.BOOKS_FETCH_START,
   });
   axios
      .get('/api/books/all')
      .then((res) => {
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
            type: actionTypes.BOOKS_FETCH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Fetch Book by id
export const fetchBookById = (id) => (dispatch) => {
   dispatch({
      type: actionTypes.BOOK_FETCH_START,
   });
   axios
      .get(`/api/books/${id}`)
      .then((res) => {
         dispatch({
            type: actionTypes.BOOK_FETCH_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
            status: error.response,
         };
         dispatch({
            type: actionTypes.BOOK_FETCH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Create Book
export const createBook = (newBook) => (dispatch, getState) => {
   dispatch({
      type: actionTypes.BOOK_CREATE_START,
   });
   axios
      .post(`/api/books`, newBook, headerConfig(getState))
      .then((res) => {
         dispatch({
            type: actionTypes.BOOK_CREATE_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
            status: error.response,
         };
         dispatch({
            type: actionTypes.BOOK_CREATE_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Update Book
export const updateBook = (updatedBook) => (dispatch, getState) => {
   const { _id: id } = updatedBook;

   dispatch({
      type: actionTypes.BOOK_UPDATE_START,
   });
   axios
      .patch(`/api/books/${id}`, updatedBook, headerConfig(getState))
      .then((res) => {
         dispatch({
            type: actionTypes.BOOK_UPDATE_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
            status: error.response,
         };
         dispatch({
            type: actionTypes.BOOK_UPDATE_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Delete Book
export const deleteBook = (id) => (dispatch, getState) => {
   dispatch({
      type: actionTypes.BOOK_DELETE_START,
   });
   axios
      .delete(`/api/books/${id}`, headerConfig(getState))
      .then((res) => {
         dispatch({
            type: actionTypes.BOOK_DELETE_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
            status: error.response,
         };
         dispatch({
            type: actionTypes.BOOK_DELETE_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Clear Books
export const clearBooks = () => (dispatch) => {
   dispatch({
      type: actionTypes.CLEAR_BOOKS,
   });
};

// Fetch all Categories
export const fetchCategories = () => (dispatch) => {
   dispatch({
      type: actionTypes.CATEGORIES_FETCH_START,
   });
   axios
      .get('/api/categories')
      .then((res) => {
         dispatch({
            type: actionTypes.CATEGORIES_FETCH_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
         };
         dispatch({
            type: actionTypes.CATEGORIES_FETCH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Create a Category
export const createCategory = (category) => (dispatch, getState) => {
   axios
      .post('/api/categories', category, headerConfig(getState))
      // eslint-disable-next-line no-unused-vars
      .then((res) => {})
      .catch((error) => {
         const errors = {
            msg: error.response,
         };
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Delete a Category
export const deleteCategory = (id) => (dispatch, getState) => {
   axios
      .delete(`/api/categories/${id}`, headerConfig(getState))
      // eslint-disable-next-line no-unused-vars
      .then((res) => {})
      .catch((error) => {
         const errors = {
            msg: error.response,
         };
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};
