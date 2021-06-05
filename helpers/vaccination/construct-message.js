const dailyVaccinationSummary = require('../../templates/vaccination/dailyVaccinationSummary');
const totalVaccinationSummary = require('../../templates/vaccination/totalVaccinationSummary');

const objectToArray = (object) => {
  const array = [];
  for (const props in object) {
    array.push(object[props]);
  }
  return array;
};

module.exports = (analysisType, statsData, stateLevel) => {
  let messages = [];
  if (analysisType === 'daily') {
    messages = dailyVaccinationSummary(statsData, stateLevel);
  } else {
    messages = totalVaccinationSummary(statsData, stateLevel);
  }
  const tweets = objectToArray(messages);
  return tweets;
};
