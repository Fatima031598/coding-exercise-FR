"use strict";

//importing points array from models folder
let points = require("../models/index");

exports.addPoint = (req, res) => {
  try {
    //if positive points create a transaction
    if (req.body.points > 0) {
      let pointObject = { ...req.body, timestamp: new Date() };
      points.push(pointObject);
      res.status(201);
      res.send(req.body);
    } else {
      //if negative points check if specified payer has a balance
      for (let i = 0; i <= points.length - 1; i++) {
        if (
          points[i].payer === req.body.payer &&
          points[i].points >= Math.abs(req.body.points)
        ) {
          //if balance exists, find oldest transaction
          let oldestTransaction = points
            .filter((transaction) => transaction.payer === req.body.payer)
            .reduce((r, o) => (o.date < r.date ? r : o));
          let indexOldestTransaction = points.indexOf(oldestTransaction);
          //subtract the spending amount, update the transaction's points
          points[indexOldestTransaction] =
            points[indexOldestTransaction] + req.body.points;
          res.status(200);
          res.send(req.body);
          break;
        } else {
          //if payer doesnt exist or payer does not have enough points
          res.status(400);
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
  try {
    let spendingAmount = req.body.points;
    const totalPoints = points
      .map((item) => item.points)
      .reduce((prev, curr) => prev + curr, 0);
    const spentAmount = [];
    //sort the points array by the oldest and start spending from the top
    points.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    //comparing spending amount to the total balance
    if (spendingAmount <= totalPoints) {
      for (let i = 0; i <= points.length - 1; i++) {
        if (spendingAmount !== 0) {
          if (points[i].points <= spendingAmount) {
            //after spending the points, update the spending amount and the used points
            spendingAmount = spendingAmount - points[i].points;
            spentAmount.push({
              payer: points[i].payer,
              points: -points[i].points,
            });
            points[i].points = 0;
          } else {
            //if spending points are smaller than the current points, update the spending points and the current points
            points[i].points = points[i].points - spendingAmount;
            spentAmount.push({
              payer: points[i].payer,
              points: -spendingAmount,
            });
            spendingAmount = 0;
          }
        }
      }
      res.status(200);
      res.send(spentAmount);
    } else {
      //spending amount is bigger than the total balance
      res.status(400);
      res.send({ error: "Declined! Not enough points" });
    }
  } catch (e) {
    console.log("error: ", e);
    res.status(500);
  }
};

exports.getAllPoints = (req, res) => {
  try {
    //combining duplicate entry point values
    let holder = {};
    points.forEach(function (point) {
      //holder object already has this property then update its points
      if (holder.hasOwnProperty(point.payer)) {
        holder[point.payer] = holder[point.payer] + point.points;
      } else {
        //otherwise add the property to holder object
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
