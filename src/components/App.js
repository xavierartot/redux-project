import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// components
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props // added by react-redux when I use connect
    dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === null
          ? null
          : <div>
            <Route component={Dashboard} exact path="/" />
            <Route component={TweetPage} path="/tweet/:id" />
            <Route component={NewTweet} path="/new" />
          </div>
          }
          </div>
        </Fragment>
      </Router>
    )
  }
}


function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser, // loading is true if is null
  }
}
export default connect(mapStateToProps)(App)
