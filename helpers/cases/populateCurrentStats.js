const { getRelevantDates } = require('../date-formatter');

module.exports = (timeData) => {
  const currentStats = {
    states: [],
  };
  const { today, yesterday } = getRelevantDates(true);
  for (const state in timeData) {
    if (timeData.hasOwnProperty(state)) {
      if (state === 'TT') {
        currentStats.today = timeData[state].dates[today].total;
        currentStats.yesterday = timeData[state].dates[yesterday];
        currentStats.changes = {};
        for (const props in timeData[state].dates[today].total) {
          currentStats.changes[props] =
            currentStats.today[props] - currentStats.yesterday[props];
        }
      } else if (state !== 'UN') {
        const stats = {
          state,
          today: timeData[state].dates[today].total,
          yesterday: timeData[state].dates[yesterday].total,
          changes: {},
        };
        for (const props in timeData[state].dates[today].total) {
          stats.changes[props] = stats.today[props] - stats.yesterday[props];
        }
        currentStats.states.push(stats);
      }
    }
  }
  return currentStats;
};
