import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewTweet extends Component {
  state = {
    text : ''
  }
  handleChange = (e) => {
    e.preventDefault()
    const {text} = this.state
    const value = e.target.value
    this.setState(() => ({
      text : value 
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.value
    console.log(value);
  }
  render() {
    const {text} = this.state
      
    return (
      <div className='NewTweet'>
        <h3 className='center'>Compose new Tweet</h3>
        <form 
          className='new-tweet' 
          onSubmit={this.handleSubmit}>
          <textarea 
            placeholder="what's happening" 
            value={text}
            maxLength="280" 
            className="textarea" 
            onChange={this.handleChange}>
          </textarea>
          <button 
            className="btn" 
            type='submit' 
            disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}


export default NewTweet;
