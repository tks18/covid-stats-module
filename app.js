require('dotenv').config;
const { TwitThread } = require('twit-thread');

// All are Template Code, Will Implement my code Soom

const config = {
  consumer_key: process.env.API,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS,
  access_token_secret: process.env.ACCESS_KEY,
};

tweets = [];
for (let i = 0; i < 60; i++) {
  tweets.push({ text: `this is a thread ${i}/n` });
}

async function tweetThread() {
  const t = new TwitThread(config);

  await t.tweetThread(tweets);
}

tweetThread();
