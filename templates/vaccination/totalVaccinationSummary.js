const { commonFooterMessage } = require('./common');
const { subGroupMessageBuilder } = require('./message-helpers');

module.exports = (statsData, stateLevel) => {
  const messages = {};
  const subGroupTerm = stateLevel ? 'Districts' : 'States';
  const heading = stateLevel
    ? `Let's Take a State for Analysis 🤔\n${statsData.name} Vaccinations`
    : `${statsData.name} Vaccination Analysis`;

  messages.overallVaccinationMessage = `${heading}\n\nDose 1 - ${statsData.tillDate.dose1.num} | ${statsData.tillDate.dose1.text}\nDose 2 - ${statsData.tillDate.dose2.num} | ${statsData.tillDate.dose2.text}\n\n#BreaktheChain\n🧵 Follow the Thread for More Details`;

  messages.populationCoverageMessage = `${statsData.name} - Population Coverage 📊\n\nDose 1:\n${statsData.tillDate.population.percentage.dose1.loader}\nPopulation Covered - ${statsData.tillDate.population.percentage.dose1.num}\n\nDose - 2:\n${statsData.tillDate.population.percentage.dose2.loader}\nPopulation Covered - ${statsData.tillDate.population.percentage.dose2.num}\n\n#BreaktheChain\nMore Details Below 👇`;

  messages.ageWiseSummary = `Age Wise Summary (Total)\n\n18 to 44 - ${statsData.tillDate.ageWise.vac_18_45.text}\n45 to 60 - ${statsData.tillDate.ageWise.vac_45_60.text}\nAbove 60 - ${statsData.tillDate.ageWise.above_60.text}\n\n#BreaktheChain\nMore Details Below 👇`;

  messages.genderWiseSummary = `Overall Gender Wise Stats\n\nMale - ${statsData.tillDate.male.text} Doses\nFemale - ${statsData.tillDate.female.text} Doses\nOthers - ${statsData.tillDate.others.text} Doses\n\n#Coronavirus #VaccinateIndia #BreaktheChain\n\nMore Details Below 👇`;

  messages.vaccineWiseMessage = `Vaccine Share Ratio 💊\n\nCovishield: ${statsData.vaccineWiseStats.covishield.text} Doses | ${statsData.vaccineWiseStats.covishield.perc}\nCovaxin: ${statsData.vaccineWiseStats.covaxin.text} Doses | ${statsData.vaccineWiseStats.covaxin.perc}\nSputnik: ${statsData.vaccineWiseStats.sputnik.text} Doses | ${statsData.vaccineWiseStats.sputnik.perc}\n\n#BreaktheChain\nMore Details Below 👇`;

  messages.subGroupTopOverall = subGroupMessageBuilder(
    statsData.name,
    subGroupTerm,
    statsData.subgroups.overall.top,
    'Top',
    'Overall',
    'total',
    true,
  );

  messages.subGroupLeastOverall = subGroupMessageBuilder(
    statsData.name,
    subGroupTerm,
    statsData.subgroups.overall.least,
    'Least',
    'Overall',
    'total',
    true,
  );

  messages.aefiSummary = `AEFI Reported\n\n(AEFI - Adverse events following immunization)\n\nTotal - ${statsData.tillDate.aefi.num} Cases\nToday - ${statsData.today.aefi.num}\nPercentage - ${statsData.tillDate.aefi.perc}%\n\n#BreaktheChain`;

  messages.footer = commonFooterMessage;
  return messages;
};
