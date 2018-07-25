import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'

class Tweet extends Component {
  render() {
    if (this.props.tweet === mull) {
      return <p>This tweet doesn't exist</p>
    }

    console.log(this.props)

    return (
      <div className="tweet" />
    )
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) { // we're getting the id from the props passed to the Tweets Component
  const tweet = tweets[id],
    parentTweet = tweet ? tweets[tweet.replyingTo] : null
  console.log(tweet.author)
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  }
}

export default connect(mapStateToProps)(Tweet)
