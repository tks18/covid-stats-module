const dateFormatter = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

module.exports = dateFormatter;

module.exports.getRelevantDates = () => {
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  today = dateFormatter(today.toDateString());
  yesterday = dateFormatter(yesterday.toDateString());
  return {
    today,
    yesterday,
  };
};
