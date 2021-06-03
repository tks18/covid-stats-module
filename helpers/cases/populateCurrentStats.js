const { getRelevantDates } = require('../date-formatter');

module.exports = (timeData, isToday) => {
  const currentStats = {
    states: [],
  };
  let relevantDates;
  if (isToday) {
    relevantDates = getRelevantDates(false, true);
  } else {
    relevantDates = getRelevantDates(true, true);
  }
  const { today, yesterday, prevYesterday } = relevantDates;
  for (const state in timeData) {
    if (timeData.hasOwnProperty(state)) {
      if (state === 'TT') {
        currentStats.today = timeData[state].dates[today].total;
        currentStats.yesterday = timeData[state].dates[yesterday].total;
        const prevYesterdayData = timeData[state].dates[prevYesterday].total;
        currentStats.changes = {
          today: {},
          yesterday: {},
        };
        for (const props in timeData[state].dates[today].total) {
          currentStats.changes.today[props] =
            currentStats.today[props] - currentStats.yesterday[props];
          currentStats.changes.yesterday[props] =
            currentStats.yesterday[props] - prevYesterdayData[props];
        }
      } else if (state !== 'UN') {
        const stats = {
          state,
          today: timeData[state].dates[today].total,
          yesterday: timeData[state].dates[yesterday].total,
          changes: {
            today: {},
            yesterday: {},
          },
        };
        const prevYesterdayData = timeData[state].dates[prevYesterday].total;
        for (const props in timeData[state].dates[today].total) {
          stats.changes.today[props] =
            stats.today[props] - stats.yesterday[props];
          stats.changes.yesterday[props] =
            stats.yesterday[props] - prevYesterdayData[props];
        }
        currentStats.states.push(stats);
      }
    }
  }
  return currentStats;
};
