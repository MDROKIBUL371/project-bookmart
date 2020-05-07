import * as actionTypes from '../actions/actionTypes';

const initialState = {
   keyword: '',
   isLoading: false,
};

export default function (state = initialState, action) {
   switch (action.type) {
      case actionTypes.SEARCH_START:
         return {
            isLoading: true,
            keyword: action.payload,
         };
      case actionTypes.SEARCH_SUCCESS:
         return {
            ...state,
            isLoading: false,
         };
      case actionTypes.SEARCH_FAIL:
         return {
            isLoading: false,
            keyword: '',
         };
      default:
         return state;
   }
}
