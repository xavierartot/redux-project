import { RECEIVE_USERS } from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
  case RECEIVE_USERS:
    return {
      ...state, // empty object
      ...action.users, // merge all the tweets in this object
    }
  default:
    return state
  }
}
