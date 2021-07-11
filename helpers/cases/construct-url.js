const CASES_DAILY = 'https://api.covid19india.org/v4/min/';
const CASES_DAILY_FILE = 'timeseries';
const CASES_TOTAL = 'https://api.covid19india.org/v4/min/data.min.json';

const buildDailyNosUrl = (stateLevel, stateId) => {
  const baseUrl = CASES_DAILY;
  const baseFile = CASES_DAILY_FILE;
  const baseFileFormat = '.min.json';
  if (stateLevel && stateId) {
    return `${baseUrl}${baseFile}-${stateId}${baseFileFormat}`;
  }
  return `${baseUrl}${baseFile}${baseFileFormat}`;
};

module.exports = (stateLevel, stateId) => {
  const totalNosData = CASES_TOTAL;
  const dailyNosData = buildDailyNosUrl(stateLevel, stateId);
  return { totalNosData, dailyNosData };
};
