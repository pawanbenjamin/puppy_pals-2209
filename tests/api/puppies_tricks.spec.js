const app = require("../../app");
const request = require("supertest");
const prisma = require("../../prisma/prisma");
const { faker } = require("@faker-js/faker");

describe("Puppies_Tricks", () => {
  let createdTrick;
  let createdPuppy;
  let createdTrick2;
  let createdPuppy2;
  afterAll(async () => {
    await prisma.puppies_Tricks.delete({
      where: {
        puppy_id_trick_id: {
          puppy_id: createdPuppy.id,
          trick_id: createdTrick.id,
        },
      },
    });
    await prisma.puppies.delete({
      where: {
        id: createdPuppy.id,
      },
    });
    await prisma.tricks.delete({
      where: {
        id: createdTrick.id,
      },
    });

    const pt = prisma.puppies_Tricks.findUnique({
      where: {
        puppy_id_trick_id: {
          puppy_id: createdPuppy2.id,
          trick_id: createdTrick2.id,
        },
      },
    });

    if (pt?.id !== undefined) {
      await prisma.puppies_Tricks.delete({
        where: {
          puppy_id_trick_id: {
            puppy_id: createdPuppy2.id,
            trick_id: createdTrick2.id,
          },
        },
      });
    }
    await prisma.puppies.delete({
      where: {
        id: createdPuppy2.id,
      },
    });
    await prisma.tricks.delete({
      where: {
        id: createdTrick2.id,
      },
    });
  });
  describe("POST /api/puppies_tricks/:puppyId/:trickId", () => {
    it("Attaches a trick to a puppy", async () => {
      createdTrick = await prisma.tricks.create({
        data: {
          title: faker.word.verb(),
        },
      });

      createdPuppy = await prisma.puppies.create({
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
      createdTrick2 = await prisma.tricks.create({
        data: {
          title: faker.word.verb(),
        },
      });

      createdPuppy2 = await prisma.puppies.create({
        data: {
          name: faker.name.fullName(),
          email: faker.internet.email(),
          age: 10,
        },
      });

      await prisma.puppies_Tricks.create({
        data: {
          puppy_id: createdPuppy2.id,
          trick_id: createdTrick2.id,
        },
      });

      const { body } = await request(app).delete(
        `/api/puppies_tricks/${createdPuppy2.id}/${createdTrick2.id}`
      );
      expect(body.trick_id).toEqual(createdTrick2.id);
      expect(body.puppy_id).toEqual(createdPuppy2.id);
    });
  });
});
