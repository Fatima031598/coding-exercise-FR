//normally this folder would contain all the models for the database

//prefilled points array
const points = [
  { payer: "DANNON", points: 1000, timestamp: "2020-11-02T14:00:00Z" },
  { payer: "UNILEVER", points: 200, timestamp: "2020-10-31T11:00:00Z" },
  { payer: "DANNON", points: 100, timestamp: "2020-10-31T10:00:00Z" },
  { payer: "MILLER COORS", points: 10000, timestamp: "2020-11-01T14:00:00Z" },
];

//exporting this array to be able to modify from the controllers folder
module.exports = points;
