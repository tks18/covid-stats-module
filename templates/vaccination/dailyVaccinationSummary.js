const DOWN = '🔻';
const UP = '🔼';

module.exports = (statsData, stateLevel) => {
  const messages = {};
  const subGroupTerm = stateLevel ? 'Districts' : 'States';

  const subGroupMessageBuilder = (
    subGroupList,
    headTerm,
    statsDataHistory,
    dataProp,
    format,
  ) => {
    let message = `${headTerm} Vaccination ${subGroupTerm} in ${statsData.name} - ${statsDataHistory}\n\n`;
    for (let i = 0; i < subGroupList.length; i++) {
      message += `${i + 1}. ${subGroupList[i].name} - ${
        format ? subGroupList[i][dataProp].text : subGroupList[i][dataProp].num
      } Doses\n`;
    }
    message +=
      '\n\n#Coronavirus #VaccinateIndia #BreaktheChain\n\nMore Details Below 👇';
    return message;
  };

  messages.overallVaccinationMessage = `Dated - ${statsData.date} 🥼\n${statsData.name} Vaccination Analysis - Thread 🧵\n\nDose 1 - ${statsData.tillDate.dose1.num} | ${statsData.tillDate.dose1.text}\nDose 2 - ${statsData.tillDate.dose2.num} | ${statsData.tillDate.dose2.text}\n\n#CoronaVirus #VaccinateIndia #BreaktheChain\n\n🧵 Follow the Thread for More Details`;

  messages.populationCoverageMessage = `${statsData.name} - Vax Population Coverage 📊\n\nDose 1:\n${statsData.tillDate.population.percentage.dose1.loader}\nPopulation Covered - ${statsData.tillDate.population.percentage.dose1.num}\n\nDose - 2:\n${statsData.tillDate.population.percentage.dose2.loader}\nPopulation Covered - ${statsData.tillDate.population.percentage.dose2.num}\n\n#CoronaVirus #VaccinateIndia #BreaktheChain\n\nMore Details Below 👇`;

  messages.todayVaccinationMessage = `Today's Vaccinations 📅\n\nDose 1: ${statsData.today.total.num} Doses\nDose 2: ${statsData.today.dose2.num} Doses\n\n#Coronavirus #BreaktheChain\n\nMore Details Below 👇`;

  messages.coverageMessage = `Compared to Yesterday:\nVaccination 📈: ${
    statsData.tillDate.comparisons.dose1.negative ? DOWN : UP
  } ${statsData.tillDate.comparisons.dose1.num}\nDose 2 📈:  ${
    statsData.tillDate.comparisons.dose2.negative ? DOWN : UP
  } ${
    statsData.tillDate.comparisons.dose2.num
  }\n\n#Coronavirus #BreaktheChain\n\nMore Details Below 👇`;

  messages.ageWiseSummary = `Age Wise Summary (Total)\n\n18 to 44 - ${statsData.tillDate.ageWise.vac_18_45.text}\n45 to 60 - ${statsData.tillDate.ageWise.vac_45_60.text}\nAbove 60 - ${statsData.tillDate.ageWise.above_60.text}\n\n#Coronavirus #VaccinateIndia #BreaktheChain\n\nMore Details Below 👇`;

  messages.ageWiseToday = `Age Wise Summary (Today)\n\n18 to 44 - ${statsData.today.ageWise.vac_18_45.num}\n45 to 60 - ${statsData.today.ageWise.vac_45_60.num}\nAbove 60 - ${statsData.today.ageWise.above_60.num}\n\n#Coronavirus #VaccinateIndia #BreaktheChain\n\nMore Details Below 👇`;

  messages.genderWiseSummary = `Overall Gender Wise Stats\n\nMale - ${statsData.tillDate.male.text} Doses\nFemale - ${statsData.tillDate.female.text} Doses\nOthers - ${statsData.tillDate.others.text} Doses\n\n#Coronavirus #VaccinateIndia #BreaktheChain\n\nMore Details Below 👇`;

  messages.genderWiseToday = `Today's Gender Wise Stats\n\nMale - ${statsData.today.male.num} Doses\nFemale - ${statsData.today.female.num} Doses\nOthers - ${statsData.today.others.num} Doses\n\n#Coronavirus #VaccinateIndia #BreaktheChain\n\nMore Details Below 👇`;

  messages.vaccineWiseMessage = `Vaccine Share Ratio 💊\n\nCovishield: ${statsData.vaccineWiseStats.covishield.text} Doses | ${statsData.vaccineWiseStats.covishield.perc}\nCovaxin: ${statsData.vaccineWiseStats.covaxin.text} Doses | ${statsData.vaccineWiseStats.covaxin.perc}\nSputnik: ${statsData.vaccineWiseStats.sputnik.text} Doses | ${statsData.vaccineWiseStats.sputnik.perc}\n\n#Coronavirus #VaccinateIndia #BreaktheChain\n\nMore Details Below 👇`;

  messages.subGroupTopOverall = subGroupMessageBuilder(
    statsData.subgroups.overall.top,
    'Top',
    'Overall',
    'total',
    true,
  );

  messages.subGroupLeastOverall = subGroupMessageBuilder(
    statsData.subgroups.overall.least,
    'Least',
    'Overall',
    'total',
    true,
  );

  messages.subGroupTopToday = subGroupMessageBuilder(
    statsData.subgroups.today.top,
    'Top',
    'Today',
    'today',
    false,
  );

  messages.subGroupLeastToday = subGroupMessageBuilder(
    statsData.subgroups.today.least,
    'Least',
    'Today',
    'today',
    false,
  );

  messages.aefiSummary = `AEFI Reported\n\n(AEFI - Adverse events following immunization)\n\nTotal - ${statsData.tillDate.aefi.num} Cases\nToday - ${statsData.today.aefi.num}\nPercentage - ${statsData.tillDate.aefi.perc}%\n\n#Coronavirus #VaccinateIndia #BreaktheChain\n\nFollow this Bot for Daily Updates 😎`;
  return messages;
};
