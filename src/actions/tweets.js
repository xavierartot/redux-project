import {saveLikeToggle} from './utils/api';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'; //actions type when receive tweets
//describe the specifix event
export const TOGGLE_TWEET = 'TOGGLE_TWEET'; //actions type when receive tweets

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

//let's make our action creator
function toggleTweet ({ id, authedUser, hasLiked }) { 
  return {
    type: TOGGLE_TWEET,
    id, 
    authedUser,
    hasLiked,
  }
}

//synchronous action creator - Ajax request
export function handleToggleTweet (info) {
  return (dispatch) => {
    //optimistic updating - UI first
    dispatch(toggleTweet(info))
    return saveLikeToggle(info)
      .catch(e) {
        console.warn('Error toggle tweet', e);
        //dispatch to back in time
        dispatch(toggleTweet(info)) // put back one more time to reset what it was initially
        alert('The was an error liking the tweet. Try again')
      }
  }
}
