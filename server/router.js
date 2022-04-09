"use strict";

const router = require("express").Router();
const points = require("./controllers/index");

router.post("/points", points.addPoint);
router.put("/points", points.spendPoints);
router.get("/points", points.getAllPoints);

module.exports = router;
