const buildDailyNosUrl = (stateLevel, stateId) => {
  const baseUrl = process.env.CASES_DAILY;
  const baseFile = process.env.CASES_DAILY_FILE;
  const baseFileFormat = '.min.json';
  if (stateLevel && stateId) {
    return `${baseUrl}${baseFile}-${stateId}${baseFileFormat}`;
  }
  return `${baseUrl}${baseFile}${baseFileFormat}`;
};

module.exports = (stateLevel, stateId) => {
  const totalNosData = process.env.CASES_TOTAL;
  const dailyNosData = buildDailyNosUrl(stateLevel, stateId);
  return { totalNosData, dailyNosData };
};
