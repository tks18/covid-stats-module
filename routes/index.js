const express = require('express');
const config = require('../configs/twitter-config');
const buildCasesTweets = require('../helpers/cases/buildCasesTweets');
const tweeter = require('../helpers/tweeter');

const { getVaccineData } = require('../helpers/vaccination/api');
const constructData = require('../helpers/vaccination/construct-data');
const constructMessage = require('../helpers/vaccination/construct-message');

const router = express.Router();

router.get('/data', async (req, res) => {
  const responses = await getVaccineData();
  const constructedData = await constructData(responses);
  const tweets = constructMessage(constructedData, true);
  // await tweeter(config, tweets);
  res.status(200).json({ tweets });
});

router.get('/cases', async (req, res) => {
  const stats = await buildCasesTweets('complete', 'TN', false);
  // await tweeter(config, message);
  res.status(200).json(stats);
});

router.get(/(\/.*)+/, (req, res) => {
  res.status(200).json({ message: 'Server is under Construction' });
});

module.exports = router;
