import { RECEIVE_TWEETS, TOGGLE_TWEET  } from '../actions/tweets';

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state, //empty object
        ...action.tweets, //merge all the tweets in this object
      }
    case TOGGLE_TWEET:
      return {
        //we're not muttating by return a brand new object spread all of previous  tweet on that object
        ...state,
        [action.id]:  {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter( (uid) =>  uid !== action.authedUser )
            : state[action.id].likes.concat([action.authedUser])
        }
      }
    default:
      return state
  }
}
