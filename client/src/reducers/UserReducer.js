import { LOAD_USER } from '../actions/types';

const INITIAL_STATE = {
  user: null
}

export default function user (state = INITIAL_STATE, action) {

  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.payload }

    default:
      return state;
  }

}
