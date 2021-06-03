const axios = require('axios');
const { getRelevantDates } = require('../date-formatter');
const urlConstructor = require('./construct-url');

module.exports.getDatafromApi = (state, district, date) => {
  const url = urlConstructor(state, district, date);
  const response = axios
    .get(url)
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
        error: 'No Data from API',
      };
    })
    .catch((error) => ({
      success: false,
      data: null,
      error,
    }));
  return response;
};

module.exports.getVaccineData = async (state = null, district = null) => {
  const dates = getRelevantDates();
  const responses = {};
  for (const date in dates) {
    const response = await this.getDatafromApi(state, district, dates[date]);
    if (response.success) {
      responses[date] = response.data;
    } else {
      response[date] = null;
    }
  }
  return responses;
};
