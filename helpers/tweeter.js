const { TwitThread } = require('twit-thread');
const reformTweet = require('./reform-tweet');

async function tweeter(config, tweetArray) {
  try {
    const threader = new TwitThread(config);
    const reformedTweet = reformTweet(tweetArray);
    const threadPost = await threader.tweetThread(reformedTweet);
    return threadPost;
  } catch (e) {
    console.log(e);
  }
}

module.exports = tweeter;
