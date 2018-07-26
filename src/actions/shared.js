import { getInitialData } from '../utils/api'
import { receiveTweets } from '../actions/tweets'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// authentification is hard coded
const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() { // middleware
  return (dispatch, getState) => { // thunk pattern with redux-thunk
    getInitialData() // return a promise
      .then(({ users, tweets }) => {
        dispatch(showLoading()) // show the loading bar
        // promise which will pass to us an object with users and tweets properties
        // let's add users, tweets to the redux store
        dispatch(receiveTweets(tweets))
        dispatch(receiveUsers(users))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading()) // hide the loading bar
      })
  }
}
