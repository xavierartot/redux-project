export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'; //actions type when receive tweets

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}
