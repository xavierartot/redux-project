import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'

class Tweet extends Component {
  render() {
    const { tweet } = this.props
    if (tweet === null) {
      return <p>This tweet doesn't exist</p>
    }
    const toParent = (event, id) => {
      event.preventDefault()
      // todo: Redirect to parent Tweet.
    }
    const handleLike = (event) => {
      event.preventDefault()
      // todo: Handle like Tweet
    }
    const {
      name, timestamp, text, avatar, likes, replies, hasLiked, parent,
    } = tweet

    // console.log(parent)
    return (
      <div className="tweet">
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className="avatar"
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
                ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
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
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  }
}

export default connect(mapStateToProps)(Tweet)
