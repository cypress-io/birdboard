const _ = require('lodash')
const TwitterAPI = require('twitter')

const twitter = new TwitterAPI({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})

const fetchTweetsByHashtags = async (hashtags) => {
  const tweets = await Promise.all(
    hashtags.map(async (hashtag) => {
      const tweets = await twitter.get('search/tweets', { 
        q: `#${hashtag}`,
        result_type: 'recent'
      })
      
      return tweets.statuses
    })
  )

  return _.shuffle(_.flatten(tweets))
}

module.exports = { fetchTweetsByHashtags }