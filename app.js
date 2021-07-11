const twitterConfig = require('./configs/twitter-config');
const tweeter = require('./helpers/tweeter');
const buildCasesTweets = require('./helpers/cases/buildCasesTweets');
const buildVaccinationTweets = require('./helpers/vaccination/buildVaccinationTweets');

module.exports = {
  tweeter,
  twitterConfig,
  buildCasesTweets,
  buildVaccinationTweets,
};

module.exports.tweeter = tweeter;
module.exports.buildCasesTweets = buildCasesTweets;
module.exports.buildVaccinationTweets = buildVaccinationTweets;
module.exports.twitterConfig = twitterConfig;
