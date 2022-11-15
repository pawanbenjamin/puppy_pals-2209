const app = require("../../app");
const request = require("supertest");
const prisma = require("../../prisma/prisma");
const { faker } = require("@faker-js/faker");

describe("Puppies", () => {
  let puppies;
  let createdPuppy;
  beforeAll(async () => {
    puppies = await prisma.puppies.findMany({
      include: {
        puppies_tricks: {
          include: {
            tricks: true,
          },
        },
      },
    });
    createdPuppy = await prisma.puppies.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        age: 10,
      },
    });
  });
  afterAll(async () => {
    if (createdPuppy?.id) {
      await prisma.puppies.delete({ where: { id: createdPuppy.id } });
    }
  });
  describe("GET /api/puppies", () => {
    it("Returns an Array of Puppies", async () => {
      const { body } = await request(app).get("/api/puppies").expect(200);
      expect(body).toEqual(expect.arrayContaining(puppies));
    });
  });
  describe("GET /api/puppies/:puppyId", () => {
    it("Gets the correct puppy by id", async () => {
      const { body } = await request(app)
        .get(`/api/puppies/${createdPuppy.id}`)
        .expect(200);
      expect(body).toEqual(expect.objectContaining(createdPuppy));
    });
  });
  describe("POST /api/puppies", () => {
    it("Creates a puppy in the db", async () => {
      const newPuppy = {
        name: faker.name.fullName(),
        age: 11,
        email: faker.internet.email(),
      };
      const { body } = await request(app).post("/api/puppies").send(newPuppy);
      expect(body).toEqual(expect.objectContaining(newPuppy));
      // Delete the puppy from the db
      await prisma.puppies.delete({
        where: {
          id: body.id,
        },
      });
    });
  });
  describe("PATCH /api/puppies/:puppyId", () => {
    it("Updates the correct puppy in the db", async () => {
      const updateObj = { name: faker.name.fullName() };
      const { body } = await await request(app)
        .patch(`/api/puppies/${createdPuppy.id}`)
        .send(updateObj);
      expect(body.name).toEqual(updateObj.name);
    });
  });
  describe("DELETE /api/puppies/:puppyId", () => {
    it("Deletes the correct puppy from the db", async () => {
      const newPuppy = await prisma.puppies.create({
        data: {
          name: faker.name.fullName(),
          age: 22,
          email: faker.internet.email(),
        },
      });
      const { body } = await request(app).delete(`/api/puppies/${newPuppy.id}`);
      expect(body.id).toEqual(newPuppy.id);
    });
  });
});
