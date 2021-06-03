const dateFormatter = (date, reverse) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  if (reverse) {
    return [day, month, year].join('-');
  }
  return [year, month, day].join('-');
};

module.exports = dateFormatter;

module.exports.getRelevantDates = (previous, last3Days) => {
  let today = new Date();
  let yesterday = new Date(today);
  let prevYesterday = new Date(today);
  if (previous) {
    today.setDate(today.getDate() - 1);
    yesterday.setDate(today.getDate() - 1);
    prevYesterday.setDate(today.getDate() - 2);
    today = dateFormatter(today.toDateString());
    yesterday = dateFormatter(yesterday.toDateString());
    prevYesterday = dateFormatter(prevYesterday.toDateString());
    const returnObj = last3Days
      ? { today, yesterday, prevYesterday }
      : { today, yesterday };
    return returnObj;
  }
  yesterday.setDate(yesterday.getDate() - 1);
  prevYesterday.setDate(yesterday.getDate() - 1);
  today = dateFormatter(today.toDateString());
  yesterday = dateFormatter(yesterday.toDateString());
  prevYesterday = dateFormatter(prevYesterday.toDateString());
  const returnObj = last3Days
    ? { today, yesterday, prevYesterday }
    : { today, yesterday };
  return returnObj;
};
