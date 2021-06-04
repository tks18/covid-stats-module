const { getRelevantDates } = require('../date-formatter');
const { objTodelta } = require('../number-helpers');
const statesList = require('../states');

const fillSubGroupData = (todayData, yestData, prevYesterdayData) => ({
  today: todayData,
  yesterday: yestData,
  changes: {
    today: objTodelta(todayData, yestData),
    yesterday: objTodelta(yestData, prevYesterdayData),
  },
});

module.exports = (timeData, isToday, stateLevel, stateId) => {
  const subGroupName = stateLevel ? 'districts' : 'states';
  let currentStats = {
    [subGroupName]: [],
  };
  let relevantDates;
  if (isToday) {
    relevantDates = getRelevantDates(false, true);
  } else {
    relevantDates = getRelevantDates(true, true);
  }
  const { today, yesterday, prevYesterday } = relevantDates;
  if (!stateLevel) {
    for (const state in timeData) {
      if (timeData.hasOwnProperty(state)) {
        const stateData = timeData[state];
        if (state === 'TT' && !stateLevel) {
          currentStats = {
            ...fillSubGroupData(
              stateData.dates[today].total,
              stateData.dates[yesterday].total,
              stateData.dates[prevYesterday].total,
            ),
            ...currentStats,
          };
        } else if (state !== 'UN' && !stateLevel) {
          const stateDetails = statesList.filter(
            (states) => states.api_code === state,
          )[0];
          const stats = {
            code: state,
            name: stateDetails.state_name,
            id: stateDetails.state_id,
            ...fillSubGroupData(
              stateData.dates[today].total,
              stateData.dates[yesterday].total,
              stateData.dates[prevYesterday].total,
            ),
          };
          currentStats.states.push(stats);
        }
      }
    }
  } else if (stateLevel && stateId) {
    const stateData = statesList.filter(
      (state) => state.api_code === stateId,
    )[0];
    currentStats = {
      name: stateData.state_name,
      code: stateData.state_code,
      id: stateData.state_id,
      ...fillSubGroupData(
        timeData[stateId].dates[today].total,
        timeData[stateId].dates[yesterday].total,
        timeData[stateId].dates[prevYesterday].total,
      ),
      ...currentStats,
    };
    const { districts } = timeData[stateId];
    for (const district in districts) {
      if (
        districts.hasOwnProperty(district) &&
        !['Unknown', 'Other State'].includes(district)
      ) {
        const districtData = districts[district];
        const stats = {
          name: district,
          ...fillSubGroupData(
            districtData?.dates[today]?.total,
            districtData?.dates[yesterday]?.total,
            districtData?.dates[prevYesterday]?.total,
          ),
        };
        currentStats.districts.push(stats);
      }
    }
  }

  return currentStats;
};
