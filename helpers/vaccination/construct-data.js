const { orderBy } = require('lodash');
const dateFormatter = require('../date-formatter');
const { getPopulationData } = require('../cases/api');
const {
  numToLoader,
  numToObj,
  parseNumObjToText,
  checkNegative,
  objTodelta,
} = require('../number-helpers');

module.exports = async (vaccineData, stateLevel, stateId) => {
  const todayData = vaccineData.today;
  const yestData = vaccineData.yesterday;
  const populationData = await getPopulationData();
  const groupSubGroupData = (subGroup) => ({
    id: stateLevel ? subGroup?.district_id : subGroup?.state_id,
    name: stateLevel ? subGroup?.district_name : subGroup?.state_name,
    state: subGroup?.state_name,
    stateID: subGroup?.state_id,
    total: numToObj(subGroup.total),
    dose1: numToObj(subGroup.partial_vaccinated),
    dose2: numToObj(subGroup.totally_vaccinated),
    today: numToObj(subGroup.today),
  });

  const subGroupData = todayData.getBeneficiariesGroupBy;
  const sortedData = {
    today: {
      top: orderBy(subGroupData, ['today'], ['desc'])
        .slice(0, 5)
        .map(groupSubGroupData),
      least: orderBy(subGroupData, ['today'], ['asc'])
        .slice(0, 5)
        .map(groupSubGroupData),
    },
    overall: {
      top: orderBy(subGroupData, ['total'], ['desc'])
        .slice(0, 5)
        .map(groupSubGroupData),
      least: orderBy(subGroupData, ['total'], ['asc'])
        .slice(0, 5)
        .map(groupSubGroupData),
    },
  };

  const connectedStateAPIID =
    stateLevel &&
    stateId &&
    populationData.data.states.filter((state) => state.id === stateId)[0];

  const relevantPopulationData = stateLevel
    ? connectedStateAPIID.population
    : populationData.data.total;

  const overallVaccinationsStats = {
    name: stateLevel ? connectedStateAPIID.state : 'India',
    date: dateFormatter(todayData.timestamp, true),
    subgroups: sortedData,
    tillDate: {
      dose1: numToObj(todayData.topBlock.vaccination.tot_dose_1),
      dose2: numToObj(todayData.topBlock.vaccination.tot_dose_2),
      male: numToObj(todayData.topBlock.vaccination.male),
      female: numToObj(todayData.topBlock.vaccination.female),
      others: numToObj(todayData.topBlock.vaccination.others),
      aefi: {
        ...numToObj(todayData.topBlock.vaccination.aefi),
        perc: todayData.aefiPercentage,
      },
      ageWise: parseNumObjToText(todayData.vaccinationByAge),
      population: {
        ...numToObj(relevantPopulationData),
        percentage: {
          dose1: numToLoader(
            +(
              (todayData.topBlock.vaccination.tot_dose_1 /
                relevantPopulationData) *
              100
            ).toFixed(2),
            '%',
          ),
          dose2: numToLoader(
            +(
              (todayData.topBlock.vaccination.tot_dose_2 /
                relevantPopulationData) *
              100
            ).toFixed(2),
            '%',
          ),
        },
      },
      comparisons: {
        dose1: checkNegative(
          +(
            ((todayData.topBlock.vaccination.today_dose_one -
              yestData.topBlock.vaccination.today_dose_one) /
              yestData.topBlock.vaccination.today_dose_one) *
            100
          ).toFixed(2),
          '%',
        ),
        dose2: checkNegative(
          +(
            ((todayData.topBlock.vaccination.today_dose_two -
              yestData.topBlock.vaccination.today_dose_two) /
              yestData.topBlock.vaccination.today_dose_two) *
            100
          ).toFixed(2),
          '%',
        ),
      },
    },
    today: {
      total: numToObj(todayData.topBlock.vaccination.today),
      dose1: numToObj(todayData.topBlock.vaccination.today_dose_one),
      dose2: numToObj(todayData.topBlock.vaccination.today_dose_two),
      male: numToObj(todayData.topBlock.vaccination.today_male),
      female: numToObj(todayData.topBlock.vaccination.today_female),
      others: numToObj(todayData.topBlock.vaccination.today_others),
      aefi: numToObj(todayData.topBlock.vaccination.today_aefi),
      ageWise: parseNumObjToText(
        objTodelta(todayData.vaccinationByAge, yestData.vaccinationByAge),
      ),
    },
    vaccineWiseStats: {
      covishield: {
        ...numToObj(todayData.topBlock.vaccination.covishield),
        perc: `${+(
          (todayData.topBlock.vaccination.covishield /
            (todayData.topBlock.vaccination.tot_dose_1 +
              todayData.topBlock.vaccination.tot_dose_2)) *
          100
        ).toFixed(2)}%`,
      },
      covaxin: {
        ...numToObj(todayData.topBlock.vaccination.covaxin),
        perc: `${+(
          (todayData.topBlock.vaccination.covaxin /
            (todayData.topBlock.vaccination.tot_dose_1 +
              todayData.topBlock.vaccination.tot_dose_2)) *
          100
        ).toFixed(2)}%`,
      },
      sputnik: {
        ...numToObj(todayData.topBlock.vaccination.sputnik),
        perc: `${+(
          (todayData.topBlock.vaccination.sputnik /
            (todayData.topBlock.vaccination.tot_dose_1 +
              todayData.topBlock.vaccination.tot_dose_2)) *
          100
        ).toFixed(4)}%`,
      },
    },
  };
  return overallVaccinationsStats;
};
