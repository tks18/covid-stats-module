const dailyVaccinationSummary = require('../../templates/vaccination/dailyVaccinationSummary');

const objectToArray = (object) => {
  const array = [];
  for (const props in object) {
    array.push(object[props]);
  }
  return array;
};

module.exports = (statsData) => {
  const messages = dailyVaccinationSummary(statsData);
  const tweets = objectToArray(messages);
  return tweets;
};
