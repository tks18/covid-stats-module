const axios = require('axios');
const populateHistoricalStats = require('./populateHistoricalStats');

const api = {
  TOTAL_NOS: 'https://api.covid19india.org/v4/min/data.min.json',
  DAILY_NOS: 'https://api.covid19india.org/v4/min/timeseries.min.json',
};

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

module.exports.getCasesData = async () => {
  const responses = {};
  for (const path in api) {
    const response = await getDatafromAPI(api[path]);
    responses[path] = response;
  }
  return responses;
};

module.exports.getPopulationData = async () => {
  const response = await getDatafromAPI(api.TOTAL_NOS);
  if (response.success) {
    const stats = populateHistoricalStats(response.data);
    const populationStats = {};
    populationStats.states = stats.states.map((state) => ({
      state: state.name,
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
