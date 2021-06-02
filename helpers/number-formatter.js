const humanFormat = require('human-format');

let numberScale = new humanFormat.Scale({
  K: 1000,
  Lacs: 100000,
  Crores: 10000000,
});

module.exports = (number) => {
  const formattedNumber = humanFormat(number, {
    scale: numberScale,
  });
  return formattedNumber;
};
