"use strict";

let points = require("../models/index");

exports.addPoint = (req, res) => {
  console.log("this is points array: ", points);
  try {
    if (req.body.points > 0) {
      let pointObject = { ...req.body, timestamp: new Date() };
      points.push(pointObject);
      res.status(201);
      res.send({ ...req.body, timestamp: new Date() });
    } else {
      for (let i = 0; i <= points.length - 1; i++) {
        if (
          points[i].payer === req.body.payer &&
          points[i].points >= Math.abs(req.body.points)
        ) {
          let oldestTransaction = points
            .filter((transaction) => transaction.payer === req.body.payer)
            .reduce((r, o) => (o.date < r.date ? r : o));
          let indexOldestTransaction = points.indexOf(oldestTransaction);
          points[indexOldestTransaction] =
            points[indexOldestTransaction] + req.body.points;
          res.status(200);
          res.send({ ...req.body, timestamp: new Date() });
          break;
        } else {
          res.status(200);
          res.send({ error: "Declined! Not enough points" });
          break;
        }
      }
    }
  } catch (e) {
    console.log("error: ", e);
    res.status(500);
  }
};

exports.spendPoints = (req, res) => {
  let spendingAmount = req.body.points;
  try {
    const spentAmount = [];
    let sortedTransactions = points.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    console.log(sortedTransactions);
    for (let i = 0; i <= points.length - 1; i++) {
      if (spendingAmount !== 0) {
        if (points[i].points <= spendingAmount) {
          spendingAmount = spendingAmount - points[i].points;
          spentAmount.push({ ...points[i], points: -points[i].points });
          points[i].points = 0;
          // let spliced = sortedTransactions.splice(
          //   sortedTransactions.indexOf(points[i]),
          //   1
          // );
          // console.log("splice: ", spliced);
          console.log(spendingAmount);
        } else {
          points[i].points = points[i].points - spendingAmount;
          spentAmount.push({ ...points[i], points: -spendingAmount });
          spendingAmount = 0;
          console.log(spendingAmount);
        }
      }
    }
    res.status(200);
    res.send(spentAmount);
  } catch (e) {
    console.log("error: ", e);
    res.status(500);
  }
};

exports.getAllPoints = (req, res) => {
  try {
    let holder = {};
    points.forEach(function (point) {
      if (holder.hasOwnProperty(point.payer)) {
        holder[point.payer] = holder[point.payer] + point.points;
      } else {
        holder[point.payer] = point.points;
      }
    });
    res.status(200);
    res.send(holder);
  } catch (e) {
    console.log("error: ", e);
    res.status(500);
  }
};
