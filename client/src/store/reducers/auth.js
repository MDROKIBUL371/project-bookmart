import * as actionTypes from '../actions/actionTypes';

const initialState = {
   accessToken: localStorage.getItem('accessToken'),
   user: {},
   isAuthenticated: false,
   purchaseSuccess: null,
   isLoading: false,
};

export default function (state = initialState, action) {
   switch (action.type) {
      case actionTypes.AUTH_START:
      case actionTypes.BOOK_PURCHASE_START:
         return {
            ...state,
            isLoading: true,
         };
      case actionTypes.USER_LOADING:
         // eslint-disable-next-line no-case-declarations
         const accessToken = localStorage.getItem('accessToken');
         return {
            ...state,
            isLoading: true,
            accessToken,
         };
      case actionTypes.USER_LOADED:
         return {
            ...state,
            user: action.payload,
            isLoading: false,
            isAuthenticated: true,
         };
      case actionTypes.BOOK_PURCHASE_SUCCESS:
         return {
            ...state,
            user: action.payload,
            purchaseSuccess: true,
            isLoading: false,
         };
      case actionTypes.BOOK_PURCHASE_FAIL:
         return {
            ...state,
            purchaseSuccess: false,
            isLoading: false,
         };
      case actionTypes.AUTH_SUCCESS:
         localStorage.setItem('accessToken', action.payload.token);
         return {
            ...state,
            user: action.payload.user,
            accessToken: action.payload.token,
            isAuthenticated: true,
            isLoading: false,
         };
      case actionTypes.USER_LOGOUT:
      case actionTypes.AUTH_FAIL:
         localStorage.removeItem('accessToken');
         return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            user: {},
            accessToken: null,
         };
      default:
         return state;
   }
}
