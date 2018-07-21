import { RECEIVE_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_USER':
      return {
        ...state, //empty object
        ...action.users,//merge all the tweets in this object
      }
    default:
      return state
  }
}
