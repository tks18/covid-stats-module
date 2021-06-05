module.exports.subGroupMessageBuilder = (
  name,
  subGroupTerm,
  subGroupList,
  headTerm,
  statsDataHistory,
  dataProp,
  format,
) => {
  let message = `${headTerm} Vaccinated ${subGroupTerm} in ${name} - ${statsDataHistory}\n\n`;
  for (let i = 0; i < subGroupList.length; i++) {
    message += `${i + 1}. ${subGroupList[i].name} - ${
      format ? subGroupList[i][dataProp].text : subGroupList[i][dataProp].num
    }\n`;
  }
  message += '\n\n#BreaktheChain\n\nMore Details Below 👇';
  return message;
};
