module.exports = (currentStats) => {
  const message = `Last 24 Hours ⏲ | Covid19 Cases\n\nConfirmed - ${currentStats.changes.today.confirmed}\nDeceased - ${currentStats.changes.today.deceased}\nRecovered - ${currentStats.changes.today.recovered}\n\n#Coronavirus #Covid #India #BreaktheChain\n\nFollow this Bot for Daily Updates 😎`;
  return message;
};
