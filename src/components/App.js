import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// components
import Dashboard from './Dashboard'
import { LoadingBar } from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props // added by react-redux when I use connect
    dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        <LoadingBar style={{ backgroundColor: 'blue', height: '35px' }} />
        {this.props.loading === true
          ? null
          : <Dashboard test="mapStateToProps" />}
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
