const express = require("express");
const supertest = require("supertest");
const mocks = require("./mocks");
const router = require("../router");

// allows using Chai assertions
const should = require("chai").should();

const app = express();
app.use(express.json());
app.use(router);

const request = supertest(app);

describe("Test server endpoints", () => {
  describe("Non-covered endpoint", () => {
    it("should return error message", async () => {
      const res = await request.get("/wrong");
      res.text.should.equal("These are not the routes you are looking for");
    });
  });

  describe("POST /points", () => {
    it("should create a new transaction", async () => {
      const res = await request.post("/points").send(mocks.testTransaction);
      res.body.should.eql(mocks.testTransaction);
      res.status.should.equal(201);
    });

    it("should decline if there is not enough balance", async () => {
      const res = await request.post("/points").send(mocks.testFailTransaction);
      res.body.should.eql({ error: "Declined! Not enough points" });
      res.status.should.equal(400);
    });
  });

  describe("GET /points", () => {
    it("should return correct type", async () => {
      const res = await request.get("/points");
      res.status.should.equal(200);
      res.body.should.be.an("object");
    });
  });

  describe("PUT /points", () => {
    it("should spend the points and return an array", async () => {
      const res = await request.put("/points").send(mocks.testSpendPoints);
      res.status.should.equal(200);
      res.body.should.be.an("array");
    });

    it("should decline if there is not enough balance", async () => {
      const res = await request.put("/points").send(mocks.testFailSpendPoints);
      res.status.should.equal(400);
      res.body.should.eql({ error: "Declined! Not enough points" });
    });
  });
});
