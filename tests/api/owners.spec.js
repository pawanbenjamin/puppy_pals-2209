const app = require("../../app");
const request = require("supertest");
const prisma = require("../../prisma/prisma");
const { faker } = require("@faker-js/faker");

describe("Owners", () => {
  let owners;
  let createdOwner;
  let fakeOwner;
  let newOwner;
  beforeAll(async () => {
    owners = await prisma.owners.findMany();
    createdOwner = await prisma.owners.create({
      data: {
        name: faker.name.fullName(),
      },
    });
  });
  afterAll(async () => {
    if (createdOwner.id) {
      await prisma.owners.delete({
        where: {
          id: createdOwner.id,
        },
      });
    }

    const fakeOwnerFromDb = await prisma.owners.findFirst({
      where: {
        name: fakeOwner.name,
      },
    });

    await prisma.owners.delete({
      where: {
        id: fakeOwnerFromDb.id,
      },
    });

    const newOwnerFromDb = await prisma.owners.findUnique({
      where: {
        id: newOwner.id,
      },
    });
    if (newOwnerFromDb) {
      await prisma.owners.delete({
        where: {
          id: newOwner.id,
        },
      });
    }
  });
  describe("GET /api/owners", () => {
    it("Returns an array of owner objects", async () => {
      const { body } = await request(app).get("/api/owners").expect(200);
      expect(body).toEqual(expect.arrayContaining(owners));
    });
  });
  describe("GET /api/owners/:ownerId", () => {
    it("Returns the correct owner by Id", async () => {
      const { body } = await request(app)
        .get(`/api/owners/${createdOwner.id}`)
        .expect(200);
      expect(body).toEqual(expect.objectContaining(createdOwner));
    });
  });
  describe("POST /api/owners", () => {
    it("Creates an owner in the db", async () => {
      fakeOwner = { name: faker.name.fullName() };
      const { body } = await request(app).post("/api/owners").send(fakeOwner);
      expect(body.name).toEqual(fakeOwner.name);
    });
  });
  describe("PATCH /api/owners/:ownerId", () => {
    it("Updates the correct owner in the db", async () => {
      const updateFields = { name: faker.name.fullName() };
      const { body } = await request(app)
        .patch(`/api/owners/${createdOwner.id}`)
        .send(updateFields);
      expect(body.name).toEqual(updateFields.name);
    });
  });
  describe("DELETE /api/owners/:ownerId", () => {
    it("Deletes the correct owner from the db", async () => {
      newOwner = await prisma.owners.create({
        data: {
          name: faker.name.fullName(),
        },
      });
      const { body } = await request(app).delete(`/api/owners/${newOwner.id}`);
      expect(body.id).toEqual(newOwner.id);
    });
  });
});
