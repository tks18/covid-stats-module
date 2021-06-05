const express = require('express');
const config = require('../configs/twitter-config');
const tweeter = require('../helpers/tweeter');
const buildCasesTweets = require('../helpers/cases/buildCasesTweets');
const buildVaccinationTweets = require('../helpers/vaccination/buildVaccinationTweets');

const router = express.Router();

router.get('/data/:type/:id?', async (req, res) => {
  const id = req.params.id && req.params.id;
  const { type } = req.params;
  const tweets = await buildVaccinationTweets(type, Number(id));
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
