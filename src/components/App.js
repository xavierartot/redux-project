import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// components
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props // added by react-redux when I use connect
    dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
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
