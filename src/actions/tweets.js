import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  }
}

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

// let's make our action creator
function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked,
  }
}

// synchronous action creator - Ajax request
export function handleToggleTweet(info) {
  return (dispatch) => {
    // optimistic updating - UI first
    dispatch(toggleTweet(info))
    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error toggle tweet', e)
        // dispatch to back in time
        dispatch(toggleTweet(info)) // put back one more time to reset what it was initially
        alert('The was an error liking the tweet. Try again')
      })
  }
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    // We're not do it an optimistic update because we're not updating, but adding an element
    return saveTweet({
      text,
      author: authedUser,
      replyingTo,
    })
      .then(tweet => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()))
  }
}
