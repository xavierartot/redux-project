import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// components
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'

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
          : <NewTweet />
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
