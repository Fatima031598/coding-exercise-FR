"use strict";

//creating an express app
const express = require("express");
const app = express();

//importing the router
const router = require("./router.js");

const PORT = 3000;

//using this middleware to be able to send JSON data
app.use(express.json());

//using this middleware to be able to route to specific endpoints requested by the client
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
