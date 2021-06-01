const numberFormatter = require('./number-formatter');
const dateFormatter = require('./date-formatter');

module.exports = (vaccineData) => {
  let todayData = vaccineData.today;
  let yestData = vaccineData.yesterday;

  let overallVaccinationsStats = {
    date: dateFormatter(todayData.timestamp),
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
      comparisons: {
        dose1: {
          num: `${+(
            (todayData.topBlock.vaccination.today_dose_one -
              yestData.topBlock.vaccination.today_dose_one) /
            yestData.topBlock.vaccination.today_dose_one
          ).toFixed(2)}%`,
          negative:
            +(
              (todayData.topBlock.vaccination.today_dose_one -
                yestData.topBlock.vaccination.today_dose_one) /
              yestData.topBlock.vaccination.today_dose_one
            ).toFixed(2) < 0
              ? true
              : false,
        },
        dose2: {
          num: `${+(
            (todayData.topBlock.vaccination.today_dose_two -
              yestData.topBlock.vaccination.today_dose_two) /
            yestData.topBlock.vaccination.today_dose_two
          ).toFixed(2)}%`,
          negative:
            +(
              (todayData.topBlock.vaccination.today_dose_two -
                yestData.topBlock.vaccination.today_dose_two) /
              yestData.topBlock.vaccination.today_dose_two
            ).toFixed(2) < 0
              ? true
              : false,
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
          todayData.topBlock.vaccination.covishield /
          todayData.topBlock.vaccination.today
        ).toFixed(2)}%`,
      },
      covaxin: {
        num: todayData.topBlock.vaccination.covaxin,
        text: numberFormatter(todayData.topBlock.vaccination.covaxin),
        perc: `${+(
          todayData.topBlock.vaccination.covaxin /
          todayData.topBlock.vaccination.today
        ).toFixed(2)}%`,
      },
      sputnik: {
        num: todayData.topBlock.vaccination.sputnik,
        text: numberFormatter(todayData.topBlock.vaccination.sputnik),
        perc: `${+(
          todayData.topBlock.vaccination.sputnik /
          todayData.topBlock.vaccination.today
        ).toFixed(2)}%`,
      },
    },
  };
  return overallVaccinationsStats;
};
