import * as actionTypes from '../actions/actionTypes';

const initialState = {
   message: {},
};

export default function (state = initialState, action) {
   switch (action.type) {
      case actionTypes.CREATE_MESSAGE:
         return {
            ...state,
            message: action.payload,
         };
      default:
         return state;
   }
}
