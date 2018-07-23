import { RECEIVE_TWEETS } from '../actions/tweets';

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state, //empty object
        ...action.tweets, //merge all the tweets in this object
      }
    default:
      return state
  }
}
