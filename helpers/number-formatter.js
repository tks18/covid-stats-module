const humanFormat = require('human-format');

let numberScale = new humanFormat.Scale({
  K: 1000,
  Mn: 1000000,
  Bn: 1000000000,
  T: 1000000000000,
});

module.exports = (number) => {
  const formattedNumber = humanFormat(number, {
    scale: numberScale,
  });
  return formattedNumber;
};
