"use strict";

//importing the router from express (express comes with build-in router)
const router = require("express").Router();

//importing the controllers (aka callbacks that handle the incoming HTTP requests)
const pointsController = require("./controllers/index");

//same endpoint but different types of requests
router.post("/points", pointsController.addPoint);
router.put("/points", pointsController.spendPoints);
router.get("/points", pointsController.getAllPoints);
router.get("*", (req, res) =>
  res.send("These are not the routes you are looking for")
);

//exporting the router middleware
module.exports = router;
