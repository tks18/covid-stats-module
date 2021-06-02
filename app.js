require('dotenv').config();

const config = require('./configs/twitter-config');
const tweeter = require('./helpers/tweeter');
const { getVaccineData } = require('./helpers/api');
const constructData = require('./helpers/construct-data');
const constructMessage = require('./helpers/construct-message');

async function getData() {
  let responses = await getVaccineData();
  let constructedData = constructData(responses);
  let tweets = constructMessage(constructedData);
  // let tweetresponse = await tweeter(config, tweets);
  console.log(tweets);
}

getData();
