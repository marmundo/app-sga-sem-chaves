import { SET_SALA } from './actionTypes';

export const setSala = (sala) => {
  return {
    type: SET_SALA,
    payload: sala,
  };
};
