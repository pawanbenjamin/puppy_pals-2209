const app = require("../../app");
const request = require("supertest");
const prisma = require("../../prisma/prisma");
const { faker } = require("@faker-js/faker");

describe("Puppies_Tricks", () => {
  describe("POST /api/puppies_tricks/:puppyId/:trickId", () => {
    it("Attaches a trick to a puppy", async () => {
      const createdTrick = await prisma.tricks.create({
        data: {
          title: faker.word.verb(),
        },
      });

      const createdPuppy = await prisma.puppies.create({
        data: {
          name: faker.name.fullName(),
          email: faker.internet.email(),
          age: 10,
        },
      });

      const { body } = await request(app).post(
        `/api/puppies_tricks/${createdPuppy.id}/${createdTrick.id}`
      );
      expect(body.trick_id).toEqual(createdTrick.id);
      expect(body.puppy_id).toEqual(createdPuppy.id);
    });
  });
  describe("DELETE /api/puppies_tricks/:puppyId/:trickId", () => {
    it("Removes a trick from a puppy", async () => {
      const newTrick = await prisma.tricks.create({
        data: {
          title: faker.word.verb(),
        },
      });

      const newPuppy = await prisma.puppies.create({
        data: {
          name: faker.name.fullName(),
          email: faker.internet.email(),
          age: 10,
        },
      });

      await prisma.puppies_Tricks.create({
        data: {
          puppy_id: newPuppy.id,
          trick_id: newTrick.id,
        },
      });

      const { body } = await request(app).delete(
        `/api/puppies_tricks/${newPuppy.id}/${newTrick.id}`
      );
      expect(body.trick_id).toEqual(newTrick.id);
      expect(body.puppy_id).toEqual(newPuppy.id);
    });
  });
});
