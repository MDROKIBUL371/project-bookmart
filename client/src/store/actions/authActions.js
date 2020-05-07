import axios from 'axios';

import * as actionTypes from './actionTypes';
import { headerConfig } from './config';

// User login
export const login = (user) => (dispatch) => {
   dispatch({
      type: actionTypes.AUTH_START,
   });
   axios
      .post('/api/auth/login', user)
      .then((res) => {
         dispatch({
            type: actionTypes.AUTH_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
         };
         dispatch({
            type: actionTypes.AUTH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// User logout
export const logout = () => (dispatch) => {
   dispatch({
      type: actionTypes.USER_LOGOUT,
   });
};

// User register
export const register = (user) => (dispatch) => {
   dispatch({
      type: actionTypes.AUTH_START,
   });
   axios
      .post('/api/auth/register', user)
      .then((res) => {
         dispatch({
            type: actionTypes.AUTH_SUCCESS,
            payload: res.data,
         });
      })
      .catch((error) => {
         const errors = {
            msg: error.response,
         };
         dispatch({
            type: actionTypes.AUTH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};

// Load logged in User
export const getLoggedInUser = () => (dispatch, getState) => {
   dispatch({
      type: actionTypes.USER_LOADING,
   });
   axios
      .get(`/api/auth/user`, headerConfig(getState))
      .then((res) => {
         dispatch({
            type: actionTypes.USER_LOADED,
            payload: res.data,
         });
      })
      .catch((error) => {
         let errors = null;
         if (error.response) {
            errors = {
               msg: error.response,
            };
         }
         dispatch({
            type: actionTypes.AUTH_FAIL,
         });
         dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: errors,
         });
      });
};
