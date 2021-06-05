const { getVaccineData } = require('./api');
const constructData = require('./construct-data');
const constructMessage = require('./construct-message');

const ANALYSIS_TYPES = ['daily', 'overall'];

module.exports = async (type, stateID, districtID) => {
  const stateLevel = !!stateID;
  //   const districtLevel = !!districtID;
  const analysisType = ANALYSIS_TYPES.includes(type) ? type : 'overall';
  const vaccineRawData = await getVaccineData(stateID, districtID);
  if (vaccineRawData.today && vaccineRawData.yesterday) {
    const constructedVaccineData = await constructData(
      vaccineRawData,
      stateLevel,
      stateID,
    );
    const tweets = constructMessage(
      analysisType,
      constructedVaccineData,
      stateLevel,
    );
    return tweets;
  }
  return [];
};
