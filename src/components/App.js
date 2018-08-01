import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// components
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props // added by react-redux when I use connect
    dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        <header>
          <LoadingBar />
        </header>
        {this.props.loading === true
          ? null
          : <TweetPage match={{ params: { id: 'hbsc73kzqi75rg7v1e0i6a', xav: 'torta' } }} />
        }
      </div>
    )
  }
}


function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null, // loading is true if is null
  }
}
export default connect(mapStateToProps)(App)
