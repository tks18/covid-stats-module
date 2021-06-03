module.exports = (rawData) => {
  const populatedStats = {
    states: [],
  };
  for (const state in rawData) {
    if (rawData.hasOwnProperty(state)) {
      const stateData = rawData[state];
      const { confirmed } = stateData.total;
      const { deceased } = stateData.total;
      const { recovered } = stateData.total;
      const { tested } = stateData.total;
      const { vaccinated } = stateData.total;
      const { population } = stateData.meta;
      if (state === 'TT') {
        populatedStats.confirmed = confirmed;
        populatedStats.deceased = deceased;
        populatedStats.recovered = recovered;
        populatedStats.tested = tested;
        populatedStats.vaccinated = vaccinated;
        populatedStats.population = population;
        populatedStats.lastUpdated = stateData.meta.last_updated;
      } else {
        const relevantData = {
          name: state,
          confirmed,
          deceased,
          recovered,
          tested,
          vaccinated,
          population,
          lastUpdated: stateData.meta.last_updated,
          districts: [],
        };
        const { districts } = stateData;
        for (const district in districts) {
          if (districts.hasOwnProperty(district)) {
            const districtLevelData = districts[district];
            const districtData = {
              name: district,
              confirmed: districtLevelData.total.confirmed,
              deceased: districtLevelData.total.deceased,
              recovered: districtLevelData.total.recovered,
              tested: districtLevelData?.total?.tested,
              vaccinated: districtLevelData?.total?.vaccinated,
              population: districtLevelData?.meta?.population,
            };
            relevantData.districts.push(districtData);
          }
        }
        populatedStats.states.push(relevantData);
      }
    }
  }
  return populatedStats;
};
