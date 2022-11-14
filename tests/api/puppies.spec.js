const app = require("../../app");
const request = require("supertest");

describe("Puppies", () => {
  describe("GET /api/puppies", () => {
    it("Returns an Array of Puppies", async () => {
      const { body } = await request(app).get("/api/puppies").expect(200);
    });
  });
});
