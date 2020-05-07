import * as actionTypes from '../actions/actionTypes';

const initialState = {
   isLoading: false,
   books: [],
   book: {},
   categories: [],
   categoriesLoading: false,
};

export default function (state = initialState, action) {
   switch (action.type) {
      case actionTypes.BOOK_FETCH_START:
      case actionTypes.BOOKS_FETCH_START:
      case actionTypes.BOOK_UPDATE_START:
      case actionTypes.BOOK_CREATE_START:
      case actionTypes.BOOK_DELETE_START:
         return {
            ...state,
            isLoading: true,
         };
      case actionTypes.CATEGORIES_FETCH_START:
         return {
            ...state,
            categoriesLoading: true,
         };
      case actionTypes.BOOK_FETCH_SUCCESS:
      case actionTypes.BOOK_CREATE_SUCCESS:
      case actionTypes.BOOK_UPDATE_SUCCESS:
      case actionTypes.BOOK_DELETE_SUCCESS:
         return {
            ...state,
            book: action.payload,
            isLoading: false,
         };
      case actionTypes.BOOKS_FETCH_SUCCESS:
         return {
            ...state,
            books: action.payload,
            isLoading: false,
         };
      case actionTypes.CATEGORIES_FETCH_SUCCESS:
         return {
            ...state,
            categories: action.payload,
            categoriesLoading: false,
         };
      case actionTypes.BOOK_FETCH_FAIL:
      case actionTypes.BOOK_CREATE_FAIL:
      case actionTypes.BOOK_UPDATE_FAIL:
      case actionTypes.BOOK_DELETE_FAIL:
      case actionTypes.CLEAR_BOOK:
         return {
            ...state,
            book: {},
            isLoading: false,
         };
      case actionTypes.BOOKS_FETCH_FAIL:
      case actionTypes.CLEAR_BOOKS:
         return {
            ...state,
            books: [],
            isLoading: false,
         };
      case actionTypes.CATEGORIES_FETCH_FAIL:
         return {
            ...state,
            categories: [],
            categoriesLoading: false,
         };
      case actionTypes.CLEAR_BOOKS_STATE:
         return {
            isLoading: false,
            books: [],
            book: {},
            categories: [],
            categoriesLoading: false,
         };
      default:
         return state;
   }
}
