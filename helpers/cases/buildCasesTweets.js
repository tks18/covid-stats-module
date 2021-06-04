const { getCasesData } = require('./api');
const populateCurrentStats = require('./populateCurrentStats');
const populateHistoricalStats = require('./populateHistoricalStats');

module.exports = async (type, stateId, today) => {
  const stateLevel = !!stateId;
  const isToday = !!today;
  const casesData = await getCasesData(true, stateId);
  const { totalNosData, dailyNosData } = casesData;
  let returnData = {};
  if (type === 'complete') {
    if (totalNosData.success && dailyNosData.success) {
      const historicalData = await populateHistoricalStats(
        totalNosData.data,
        stateLevel,
        stateId,
      );
      const todaysData = await populateCurrentStats(
        dailyNosData.data,
        isToday,
        stateLevel,
        stateId,
      );
      returnData = { historicalData, todaysData };
    }
  } else if (type === 'historical') {
    if (totalNosData.success) {
      const historicalData = await populateHistoricalStats(
        totalNosData.data,
        stateLevel,
        stateId,
      );
      returnData = historicalData;
    }
  } else if (type === 'today') {
    if (dailyNosData.success) {
      const todaysData = await populateCurrentStats(
        dailyNosData.data,
        isToday,
        stateLevel,
        stateId,
      );
      returnData = todaysData;
    }
  }
  return returnData;
};
