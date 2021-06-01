require('dotenv').config();

const config = require('./configs/twitter-config');
const tweeter = require('./helpers/tweeter');
var humanFormat = require('human-format');
const axios = require('axios');

// const postTweet = tweeter(config, tweets);
// console.log(postTweet);
let numberScale = new humanFormat.Scale({
  K: 1000,
  Mn: 1000000,
  Bn: 1000000000,
  T: 1000000000000,
});

axios
  .get(
    'https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=2021-06-01',
  )
  .then((response) => {
    if (response.status === 200) {
      let data = response.data;
      let total_vaccinations = data.topBlock.vaccination;
      // let formatted_vaccinations = humanFormat(total_vaccinations, {
      //   scale: numberScale,
      //   decimal: 2,
      // });
      // let tweet = `\nTotal Vaccinations Done Till Date\n${total_vaccinations} / ${formatted_vaccinations}`;
      // tweeter(config, tweet);
      console.log(total_vaccinations);
    }
  });
