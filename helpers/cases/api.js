const axios = require('axios');
const constructUrl = require('./construct-url');
const populateHistoricalStats = require('./populateHistoricalStats');

const getDatafromAPI = (apiPath) => {
  const response = axios
    .get(apiPath)
    .then((resp) => {
      if (resp.status === 200 && resp.data) {
        return {
          success: true,
          data: resp.data,
          error: null,
        };
      }
      return {
        success: false,
        data: null,
        error: 'Something Happened Server Side',
      };
    })
    .catch((error) => ({
      success: false,
      data: null,
      error,
    }));
  return response;
};

module.exports.getCasesData = async (stateLevel, stateId) => {
  const responses = {};
  const api = constructUrl(stateLevel, stateId);
  for (const path in api) {
    const response = await getDatafromAPI(api[path]);
    responses[path] = response;
  }
  return responses;
};

module.exports.getPopulationData = async () => {
  const api = constructUrl();
  const response = await getDatafromAPI(api.totalNosData);
  if (response.success) {
    const stats = populateHistoricalStats(response.data);
    const populationStats = {};
    populationStats.states = stats.states.map((state) => ({
      state: state.name,
      id: state.id,
      code: state.code,
      population: state.population,
    }));
    populationStats.total = stats.population;
    return {
      success: true,
      data: populationStats,
    };
  }
  return {
    success: false,
    data: null,
    error: null,
  };
};
