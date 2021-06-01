const { TwitThread } = require('twit-thread');
const reformTweet = require('./reform-tweet');

async function tweeter(config, tweetArray) {
  try {
    const threader = new TwitThread(config);
    const reformedTweet = reformTweet(tweetArray);
    const threadPost = await threader.tweetThread(reformedTweet);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = tweeter;
