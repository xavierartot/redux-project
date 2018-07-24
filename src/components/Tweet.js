import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'

class Tweet extends Component {
  render() {
    return (
      <div className="tweet" />
    )
  }
}

// mapStateToProps (state, props)
function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id]
  console.log(tweet.author, users, users[tweet.author], tweet, authedUser)

  return {
    authedUser,
    // tweet: formatTweet(tweet, users[tweet.author], authedUser),
  }
}

export default connect(mapStateToProps)(Tweet)
