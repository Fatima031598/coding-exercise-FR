"use strict";

const express = require("express");
const app = express();
const router = require("./router.js");
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
