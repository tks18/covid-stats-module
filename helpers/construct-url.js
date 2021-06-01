module.exports = (state = null, district = null, date) => {
  let url = process.env.API_URL;
  let constructedUrl;
  if (
    (state === null || !Number.isInteger(state)) &&
    (district === null || !Number.isInteger(district)) &&
    date
  ) {
    constructedUrl = `${url}?date=${date}`;
  } else if (
    state !== null &&
    Number.isInteger(state) &&
    (district === null || !Number.isInteger(district)) &&
    date
  ) {
    constructedUrl = `${url}?state=${state}&date=${date}`;
  } else if (
    (state === null || !Number.isInteger(state)) &&
    district !== null &&
    Number.isInteger(district) &&
    date
  ) {
    constructedUrl = `${url}?district=${district}&date=${date}`;
  } else if (
    state !== null &&
    Number.isInteger(state) &&
    district !== null &&
    Number.isInteger(district) &&
    date
  ) {
    constructedUrl = `${url}?state=${state}&district=${district}&date=${date}`;
  } else {
    constructedUrl = null;
  }
  return constructedUrl;
};
