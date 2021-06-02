const { orderBy } = require('lodash');
const numberFormatter = require('../number-formatter');
const dateFormatter = require('../date-formatter');
const { getPopulationData } = require('../cases/api');

module.exports = async (vaccineData) => {
  const todayData = vaccineData.today;
  const yestData = vaccineData.yesterday;
  const populationData = await getPopulationData();

  const statesData = todayData.getBeneficiariesGroupBy;
  const sortedData = {
    today: orderBy(statesData, ['today'], ['desc'])
      .slice(0, 5)
      .map((state) => ({
        id: state.state_id,
        name: state.state_name,
        total: {
          num: state.total,
          text: numberFormatter(state.total),
        },
        dose1: {
          num: state.partial_vaccinated,
          text: numberFormatter(state.partial_vaccinated),
        },
        dose2: {
          num: state.totally_vaccinated,
          text: numberFormatter(state.totally_vaccinated),
        },
        today: {
          num: state.today,
          text: numberFormatter(state.today),
        },
      })),
    overall: orderBy(statesData, ['total'], ['desc'])
      .slice(0, 5)
      .map((state) => ({
        id: state.state_id,
        name: state.state_name,
        total: {
          num: state.total,
          text: numberFormatter(state.total),
        },
        dose1: {
          num: state.partial_vaccinated,
          text: numberFormatter(state.partial_vaccinated),
        },
        dose2: {
          num: state.totally_vaccinated,
          text: numberFormatter(state.totally_vaccinated),
        },
        today: {
          num: state.today,
          text: numberFormatter(state.today),
        },
      })),
  };

  const overallVaccinationsStats = {
    date: dateFormatter(todayData.timestamp, true),
    topStates: sortedData,
    tillDate: {
      dose1: {
        num: todayData.topBlock.vaccination.tot_dose_1,
        text: numberFormatter(todayData.topBlock.vaccination.tot_dose_1),
      },
      dose2: {
        num: todayData.topBlock.vaccination.tot_dose_2,
        text: numberFormatter(todayData.topBlock.vaccination.tot_dose_2),
      },
      male: {
        num: todayData.topBlock.vaccination.male,
        text: numberFormatter(todayData.topBlock.vaccination.male),
      },
      female: {
        num: todayData.topBlock.vaccination.female,
        text: numberFormatter(todayData.topBlock.vaccination.female),
      },
      adverseEffects: {
        num: todayData.topBlock.vaccination.aefi,
        text: numberFormatter(todayData.topBlock.vaccination.aefi),
      },
      population: {
        num: populationData.data.total,
        text: numberFormatter(populationData.data.total),
        percentage: {
          dose1: `${+(
            (todayData.topBlock.vaccination.tot_dose_1 /
              populationData.data.total) *
            100
          ).toFixed(2)}%`,
          dose2: `${+(
            (todayData.topBlock.vaccination.tot_dose_2 /
              populationData.data.total) *
            100
          ).toFixed(2)}%`,
        },
      },
      comparisons: {
        dose1: {
          num: `${+(
            ((todayData.topBlock.vaccination.today_dose_one -
              yestData.topBlock.vaccination.today_dose_one) /
              yestData.topBlock.vaccination.today_dose_one) *
            100
          ).toFixed(2)}%`,
          negative:
            +(
              ((todayData.topBlock.vaccination.today_dose_one -
                yestData.topBlock.vaccination.today_dose_one) /
                yestData.topBlock.vaccination.today_dose_one) *
              100
            ).toFixed(2) < 0,
        },
        dose2: {
          num: `${+(
            ((todayData.topBlock.vaccination.today_dose_two -
              yestData.topBlock.vaccination.today_dose_two) /
              yestData.topBlock.vaccination.today_dose_two) *
            100
          ).toFixed(2)}%`,
          negative:
            +(
              ((todayData.topBlock.vaccination.today_dose_two -
                yestData.topBlock.vaccination.today_dose_two) /
                yestData.topBlock.vaccination.today_dose_two) *
              100
            ).toFixed(2) < 0,
        },
      },
    },
    today: {
      total: {
        num: todayData.topBlock.vaccination.today,
        text: numberFormatter(todayData.topBlock.vaccination.today),
      },
      dose1: {
        num: todayData.topBlock.vaccination.today_dose_one,
        text: numberFormatter(todayData.topBlock.vaccination.today_dose_one),
      },
      dose2: {
        num: todayData.topBlock.vaccination.today_dose_two,
        text: numberFormatter(todayData.topBlock.vaccination.today_dose_two),
      },
    },
    vaccineWiseStats: {
      covishield: {
        num: todayData.topBlock.vaccination.covishield,
        text: numberFormatter(todayData.topBlock.vaccination.covishield),
        perc: `${+(
          (todayData.topBlock.vaccination.covishield /
            (todayData.topBlock.vaccination.tot_dose_1 +
              todayData.topBlock.vaccination.tot_dose_2)) *
          100
        ).toFixed(2)}%`,
      },
      covaxin: {
        num: todayData.topBlock.vaccination.covaxin,
        text: numberFormatter(todayData.topBlock.vaccination.covaxin),
        perc: `${+(
          (todayData.topBlock.vaccination.covaxin /
            (todayData.topBlock.vaccination.tot_dose_1 +
              todayData.topBlock.vaccination.tot_dose_2)) *
          100
        ).toFixed(2)}%`,
      },
      sputnik: {
        num: todayData.topBlock.vaccination.sputnik,
        text: numberFormatter(todayData.topBlock.vaccination.sputnik),
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
