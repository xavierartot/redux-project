export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return `${time.substr(0, 5) + time.slice(-2)} | ${d.toLocaleDateString()}`
}

export function formatTweet(tweet, userAuthor, authedUser, parentTweet) {
  const {
    id, likes, replies, text, timestamp, // tweets DB table
  } = tweet
  const { name, avatarURL } = userAuthor // users DB table

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet ? null : {
      userAuthor: parentTweet.userAuthor,
      id: parentTweet.id,
    },
  }
}
