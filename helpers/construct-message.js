const DOWN = '🔻';
const UP = '🔼';

module.exports = (statsData) => {
  const tweet1 = `Dated - ${
    statsData.date
  } 💉🇮🇳 | Vaccine Report\n\nTotal Vaccinations - ${
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

  const tweet2 = `Today's Vaccinations 📅\n\nDose 1: ${statsData.today.total.num}\nDose 2: ${statsData.today.dose2.num}\n\n #IndiaBeatsCovid #BreaktheChain`;
  const tweet3 = `Vaccine wise Report 💊\n\nCovishield: ${statsData.vaccineWiseStats.covishield.text} Doses | ${statsData.vaccineWiseStats.covishield.perc}\nCovaxin: ${statsData.vaccineWiseStats.covaxin.text} Doses | ${statsData.vaccineWiseStats.covaxin.perc}\nSputnik: ${statsData.vaccineWiseStats.sputnik.text} Doses | ${statsData.vaccineWiseStats.sputnik.perc}\n\nFollow for Daily Reports about Vaccinations`;
  const tweets = [tweet1, tweet2, tweet3];
  return tweets;
};
