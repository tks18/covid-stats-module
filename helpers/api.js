const axios = require('axios');
const { getRelevantDates } = require('./date-formatter');
const urlConstructor = require('./construct-url');

module.exports.getDatafromApi = (state, district, date) => {
  let url = urlConstructor(state, district, date);
  let response = axios
    .get(url)
    .then((response) => {
      if (response.status === 200 && response.data) {
        return {
          success: true,
          data: response.data,
          error: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error: 'No Data from API',
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        data: null,
        error,
      };
    });
  return response;
};

module.exports.getVaccineData = async (state = null, district = null) => {
  let dates = getRelevantDates();
  let responses = {};
  for (const date in dates) {
    let response = await this.getDatafromApi(state, district, dates[date]);
    if (response.success) {
      responses[date] = response.data;
    } else {
      response[date] = null;
    }
  }
  return responses;
};
