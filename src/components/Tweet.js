import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet } from '../actions/tweets'

class Tweet extends Component {
  handleLike = (event) => {
    event.preventDefault()

    const { dispatch, tweet, authedUser } = this.props

    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser,
    }))
  }
  toParent = (event, id) => {
    event.preventDefault()
    // todo: Redirect to parent Tweet.
  }
  render() {
    const { tweet } = this.props
    if (tweet === null) {
      return <p>This tweet doesn't exist</p>
    }
    const {
      name, timestamp, text, avatar, likes, replies, hasLiked, parent,
    } = tweet

    // console.log(parent)
    return (
      <div className="tweet">
        <img
          alt={`Avatar of ${name}`}
          className="avatar"
          src={avatar}
        />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className="replying-to" onClick={e => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline className="tweet-icon" color="#e0245e" />
                : <TiHeartOutline className="tweet-icon" />}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) { // we're getting the id from the props passed to the Tweets Component
  const tweet = tweets[id],
    parentTweet = tweet ? tweets[tweet.replyingTo] : null
  return {
    authedUser,
    tweet: tweet // if id exist format the Tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  }
}

export default connect(mapStateToProps)(Tweet)
