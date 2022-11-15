const app = require("../../app");
const request = require("supertest");
const prisma = require("../../prisma/prisma");
const { faker } = require("@faker-js/faker");

describe("Tricks", () => {
  let tricks;
  let createdTrick;
  beforeAll(async () => {
    tricks = await prisma.tricks.findMany();
    createdTrick = await prisma.tricks.create({
      data: {
        title: faker.word.verb(),
      },
    });
  });
  afterAll(async () => {
    if (createdTrick.id) {
      await prisma.tricks.delete({
        where: {
          id: createdTrick.id,
        },
      });
    }
  });
  describe("GET /api/tricks", () => {
    it("Returns an array of trick objects", async () => {
      const { body } = await request(app).get("/api/tricks").expect(200);
      expect(body).toEqual(expect.arrayContaining(tricks));
    });
  });
  describe("GET /api/tricks/:trickId", () => {
    it("Returns the correct trick by Id", async () => {
      const { body } = await request(app)
        .get(`/api/tricks/${createdTrick.id}`)
        .expect(200);
      expect(body).toEqual(expect.objectContaining(createdTrick));
    });
  });
  describe("POST /api/tricks", () => {
    it("Creates an owner in the db", async () => {
      const fakeTrick = { title: faker.word.verb() };
      const { body } = await request(app).post("/api/tricks").send(fakeTrick);
      expect(body.title).toEqual(fakeTrick.title);
    });
  });
  describe("PATCH /api/tricks/:trickId", () => {
    it("Updates the correct trick in the db", async () => {
      const updateFields = { title: faker.word.verb() };
      const { body } = await request(app)
        .patch(`/api/tricks/${createdTrick.id}`)
        .send(updateFields);
      expect(body.title).toEqual(updateFields.title);
    });
  });
  describe("DELETE /api/tricks/:trickId", () => {
    it("Deletes the correct owner from the db", async () => {
      const newTrick = await prisma.tricks.create({
        data: {
          title: faker.word.verb(),
        },
      });
      const { body } = await request(app).delete(`/api/tricks/${newTrick.id}`);
      expect(body.id).toEqual(newTrick.id);
    });
  });
});
