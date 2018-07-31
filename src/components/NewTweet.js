import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class NewTweet extends Component {
  state = {
    text: '',
  }
  handleChange = (e) => { // onChange textarea
    const { text } = this.state;
    const value = e.target.value;
    this.setState(() => ({// the values in state text
      text: value,
    }));
  }
  handleSubmit = (e) => { // submit button
    e.preventDefault();
    const { text } = this.state;
    const { dispatch, id } = this.props;

    console.log(id);
    // todo: Add Tweet to Store
    dispatch(handleAddTweet(text, id));

    console.log('New Tweet', text);

    this.setState(() => ({
      text: '',
    }));
  }
  render() {
    const { text } = this.state;

    // todo: redirect to / if submited

    const tweetLeft = 280 - text.length;

    return (
      <div className="NewTweet">
        <h3 className="center">Compose new Tweet</h3>
        <form
          className="new-tweet"
          onSubmit={this.handleSubmit}
        >
          <textarea
            placeholder="what's happening"
            value={text}
            maxLength="280"
            className="textarea"
            onChange={this.handleChange}
          />
          { tweetLeft <= 200 && (
            <div className="tweet-length">
              {tweetLeft} less
            </div>
          )}
          <button
            className="btn"
            type="submit"
            disabled={text === ''}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}


export default connect()(NewTweet);
