import { getInitialData } from '../utils/api'
import { receiveTweets } from '../actions/tweets'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'

// authentification is hard coded
const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
  return dispatch => // thunk pattern with redux-thunk
    getInitialData() // retun a promise
      .then(({ users, tweets }) => {
        // promise which will pass to us an object with users and tweets properties
        // let's add users, tweets to the redux store
        dispatch(receiveTweets(tweets))
        dispatch(receiveUsers(users))
        dispatch(setAuthedUser(AUTHED_ID))
      })
}
