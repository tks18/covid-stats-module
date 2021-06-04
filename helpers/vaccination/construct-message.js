const dailyVaccinationSummary = require('../../templates/vaccination/dailyVaccinationSummary');

const objectToArray = (object) => {
  const array = [];
  for (const props in object) {
    array.push(object[props]);
  }
  return array;
};

module.exports = (statsData, stateLevel) => {
  const messages = dailyVaccinationSummary(statsData, stateLevel);
  const tweets = objectToArray(messages);
  return tweets;
};
