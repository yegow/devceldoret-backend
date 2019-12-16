import { expect } from "chai";

import request from "supertest";
const event = require ("../DB/db.js");
const Database = require("../DB/index")
import app from "../server";

describe("DevC", () => {
  // gets json response
  describe("GET events", () => {
    let id: number;
    before(done => {
      Database.query(
        // Insert default Event into table events
        "INSERT INTO events (id, title) VALUES ($1, $2) RETURNING id",
        [event.getEvents.id, event.getEvents.title]
      ).then((value: { id: number; }) => {
        id = value.id;
        done();
      });
    });
    it("gets event information with the id of 1", done => {
      request(app)
        .get("/api/v1/events")
        .send(event.getEvents)
        .expect("Content-Type", /json/)
        .then(res => {
          const { value } = res.body;
          expect(res.status).to.equal(200);
          expect(status).to.equal("success");
          expect(value).to.have.property('id');
          done();
        })
        .catch(error => done(error));
    });
  });
});
