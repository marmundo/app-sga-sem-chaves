import { SET_SALA } from '../actions/actionTypes';

const initialState = {
  salas: {
    1: {
      porta: 'Aberta',
    },
    21: {},
    22: {},
    23: {},
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SALA:
      return {
        ...state,
        salas: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
