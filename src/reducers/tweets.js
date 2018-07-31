import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets';

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state, // empty object
        ...action.tweets, // merge all the tweets in this object
      };
    case TOGGLE_TWEET:
      return {
        // we're not muttating by return a brand new object spread all of previous  tweet on that object
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter(uid => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser]),
        },
      };
    case ADD_TWEET: {
      const { tweet } = action;
      let replyingToObj = {};
      if (tweet.replyingTo !== null) {
        replyingToObj = {
          [tweet.replyingTo]: { // replyingTo
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id]),
          },
        };
      }
      return {
        ...state, // spread all the previous tweets
        [action.tweet.id]: action.tweet, // adding our new tweet to our tweet state
        ...replyingToObj,
      };
    }
    default:
      return state;
  }
}
