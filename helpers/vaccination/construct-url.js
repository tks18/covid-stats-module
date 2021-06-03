module.exports = (state = null, district = null, date) => {
  const url = process.env.API_URL;
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
    constructedUrl = `${url}?state_id=${state}&date=${date}`;
  } else if (
    (state === null || !Number.isInteger(state)) &&
    district !== null &&
    Number.isInteger(district) &&
    date
  ) {
    constructedUrl = `${url}?district_id=${district}&date=${date}`;
  } else if (
    state !== null &&
    Number.isInteger(state) &&
    district !== null &&
    Number.isInteger(district) &&
    date
  ) {
    constructedUrl = `${url}?state_id=${state}&district_id=${district}&date=${date}`;
  } else {
    constructedUrl = null;
  }
  return constructedUrl;
};
