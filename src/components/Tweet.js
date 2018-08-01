import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom' // withRouter allow to connect the route as property with connect

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
    this.props.history.push(`/tweet/${id}`)
  }
  render() {
    const { tweet } = this.props
    if (tweet === null) {
      return <p>This tweet doesn't exist</p>
    }
    const {
      name, timestamp, text, avatar, likes, replies, hasLiked, parent, id,
    } = tweet

    // console.log(parent)
    return (
      <Link className="tweet" to={`/tweet/${id}`}>
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
      </Link>
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

export default withRouter(connect(mapStateToProps)(Tweet))
