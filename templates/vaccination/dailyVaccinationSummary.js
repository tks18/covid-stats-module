const { commonFooterMessage } = require('./common');
const { subGroupMessageBuilder } = require('./message-helpers');

const DOWN = '🔻';
const UP = '🔼';

module.exports = (statsData, stateLevel) => {
  const messages = {};
  const subGroupTerm = stateLevel ? 'Districts' : 'States';

  messages.todayVaccinationMessage = `${statsData.date}🥼\n${statsData.name} - Today's Vaccinations \n\nDose 1: ${statsData.today.total.num} Doses\nDose 2: ${statsData.today.dose2.num} Doses\n\n#BreaktheChain\nMore Details Below 👇`;

  messages.populationCoverageMessage = `${statsData.name} - Population Coverage 📊\n\nDose 1:\n${statsData.tillDate.population.percentage.dose1.loader}\nPopulation Covered - ${statsData.tillDate.population.percentage.dose1.num}\n\nDose - 2:\n${statsData.tillDate.population.percentage.dose2.loader}\nPopulation Covered - ${statsData.tillDate.population.percentage.dose2.num}\n\n#BreaktheChain\nMore Details Below 👇`;

  messages.coverageMessage = `Compared to Yesterday:\nVaccination 📈: ${
    statsData.tillDate.comparisons.dose1.negative ? DOWN : UP
  } ${statsData.tillDate.comparisons.dose1.num}\nDose 2 📈:  ${
    statsData.tillDate.comparisons.dose2.negative ? DOWN : UP
  } ${
    statsData.tillDate.comparisons.dose2.num
  }\n\n#BreaktheChain\nMore Details Below 👇`;

  messages.subGroupTopToday = subGroupMessageBuilder(
    statsData.name,
    subGroupTerm,
    statsData.subgroups.today.top,
    'Top',
    'Today',
    'today',
    false,
  );

  messages.footer = commonFooterMessage;
  return messages;
};
