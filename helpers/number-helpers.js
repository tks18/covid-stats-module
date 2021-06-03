const commaFormatter = require('comma-number');
const numberFormatter = require('./number-formatter');

module.exports.textLoader = (percentage) => {
  const loader = [];
  for (let n = 0; n < 20; n++) {
    if (percentage < (n + 1) * 5) {
      loader.push('░');
    } else {
      loader.push('▓');
    }
  }
  const text = loader.join('');
  return text;
};

module.exports.numToLoader = (number, suffix) => ({
  num: suffix ? `${number}${suffix}` : number,
  loader: this.textLoader(number),
});

module.exports.numToObj = (number, noFormat) => ({
  num: noFormat ? number : commaFormatter(number),
  text: numberFormatter(number),
});

module.exports.parseNumObjToText = (obj, noFormat) => {
  const data = {};
  for (const props in obj) {
    const propValue = obj[props];
    if (Number.isInteger(propValue)) {
      data[props] = this.numToObj(propValue, noFormat);
    } else {
      data[props] = propValue;
    }
  }
  return data;
};

module.exports.checkNegative = (number, suffix) => ({
  num: suffix ? `${number}${suffix}` : number,
  negative: number < 0,
});

module.exports.objTodelta = (obj1, obj2) => {
  const data = {};
  for (const props in obj1) {
    data[props] = obj1[props] - obj2[props];
  }
  return data;
};
