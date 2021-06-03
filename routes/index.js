const express = require('express');
const config = require('../configs/twitter-config');
const tweeter = require('../helpers/tweeter');

const { getCasesData } = require('../helpers/cases/api');
const populateCurrentStats = require('../helpers/cases/populateCurrentStats');
const { getVaccineData } = require('../helpers/vaccination/api');
const constructData = require('../helpers/vaccination/construct-data');
const constructMessage = require('../helpers/vaccination/construct-message');
const constructCasesMessage = require('../helpers/cases/construct-message');
const populateHistoricalStats = require('../helpers/cases/populateHistoricalStats');

const router = express.Router();

router.get('/data', async (req, res) => {
  const responses = await getVaccineData();
  const constructedData = await constructData(responses);
  const tweets = constructMessage(constructedData);
  // await tweeter(config, tweets);
  res.status(200).json(tweets);
});

router.get('/cases', async (req, res) => {
  const summa = await getCasesData();
  const stats = await populateHistoricalStats(summa.TOTAL_NOS.data);
  // const message = constructCasesMessage(stats);
  // await tweeter(config, message);
  res.status(200).json(stats);
});

router.get(/(\/.*)+/, (req, res) => {
  res.status(200).json({ message: 'Server is under Progress' });
});

module.exports = router;
