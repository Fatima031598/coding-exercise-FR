const mocks = {
  testTransaction: {
    payer: "TARGET",
    points: 200,
    timestamp: "2020-10-31T15:00:00Z",
  },
  testFailTransaction: {
    payer: "TARGET",
    points: -20000,
    timestamp: "2020-10-31T15:00:00Z",
  },
  testSpendPoints: {
    points: 200,
  },
  testSpendPointsResponse: [
    {
      payer: "TARGET",
      points: -200,
    },
  ],
  testFailSpendPoints: {
    points: 50000,
  },
};

module.exports = mocks;
