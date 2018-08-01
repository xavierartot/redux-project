import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
  state = {
    text: '',
    redirectToHome: false, // determine if NewTweet is a reply to a tweet or a new tweet
  }
  handleChange = (e) => { // onChange textarea
    const { text } = this.state
    const value = e.target.value
    this.setState(() => ({// the values in state text
      text: value,
    }))
  }
  handleSubmit = (e) => { // submit button
    e.preventDefault()
    const { text } = this.state
    const { dispatch, id } = this.props

    console.log(id)
    // todo: Add Tweet to Store
    dispatch(handleAddTweet(text, id))

    console.log('New Tweet', text)

    this.setState(() => ({
      text: '',
      redirectToHome: !id, // new tweet is by itslef or using in Dashboard
    }))
  }
  render() {
    const { text, redirectToHome } = this.state

    if (redirectToHome === true) {
      return <Redirect to="/" />
    }
    const tweetLeft = 280 - text.length

    return (
      <div className="NewTweet">
        <h3 className="center">Compose new Tweet</h3>
        <form
          className="new-tweet"
          onSubmit={this.handleSubmit}
        >
          <textarea
            className="textarea"
            maxLength="280"
            onChange={this.handleChange}
            placeholder="what's happening"
            value={text}
          />
          { tweetLeft <= 200 && (
            <div className="tweet-length">
              {tweetLeft} less
            </div>
          )}
          <button
            className="btn"
            disabled={text === ''}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}


export default connect()(NewTweet)
