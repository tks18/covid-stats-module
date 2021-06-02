const DOWN = '🔻';
const UP = '🔼';

const objectToArray = (object) => {
  const array = [];
  for (const props in object) {
    array.push(object[props]);
  }
  return array;
};

module.exports = (statsData) => {
  let messages = {};
  messages['overallVaccinationMessage'] = `${
    statsData.date
  } 🥼 | Vaccination Report (Till Date)\n\nDose 1 - ${
    statsData.tillDate.dose1.text
  }\nDose 2 - ${
    statsData.tillDate.dose2.text
  }\n\nCompared to Yesterday:\nVaccination 📈: ${
    statsData.tillDate.comparisons.dose1.negative ? DOWN : UP
  } ${statsData.tillDate.comparisons.dose1.num}\nDose 2 📈:  ${
    statsData.tillDate.comparisons.dose2.negative ? DOWN : UP
  } ${
    statsData.tillDate.comparisons.dose2.num
  }\n\n #IndiaBeatsCovid #BreaktheChain\n\n🧵 See Thread for More Details`;

  messages[
    'todayVaccinationMessage'
  ] = `Today's Vaccinations 📅\n\nDose 1: ${statsData.today.total.num} Doses\nDose 2: ${statsData.today.dose2.num} Doses\n\n #IndiaBeatsCovid #BreaktheChain`;

  messages[
    'vaccineWiseMessage'
  ] = `Vaccine wise Report 💊\n\nCovishield: ${statsData.vaccineWiseStats.covishield.text} Doses | ${statsData.vaccineWiseStats.covishield.perc}\nCovaxin: ${statsData.vaccineWiseStats.covaxin.text} Doses | ${statsData.vaccineWiseStats.covaxin.perc}\nSputnik: ${statsData.vaccineWiseStats.sputnik.text} Doses | ${statsData.vaccineWiseStats.sputnik.perc}\n\nFollow for Daily Reports about Vaccinations`;

  const tweets = objectToArray(messages);
  return tweets;
};
