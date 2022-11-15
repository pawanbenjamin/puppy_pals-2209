const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");
const prisma = require("../prisma/prisma");

// GET /api/puppies
router.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const puppies = await prisma.puppies.findMany({
      include: {
        puppies_tricks: {
          include: {
            tricks: true,
          },
        },
      },
    });
    res.send(puppies);
  })
);

// GET /api/puppies/:puppyId
router.get(
  "/:puppyId",
  asyncErrorHandler(async (req, res, next) => {
    const singlePup = await prisma.puppies.findUnique({
      where: {
        id: +req.params.puppyId,
      },
      include: {
        puppies_tricks: {
          include: {
            tricks: true,
          },
        },
      },
    });
    res.send(singlePup);
  })
);

// POST /api/puppies
router.post(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    // const { name, age, email, ownerId } = req.body;
    const createdPup = await prisma.puppies.create({
      data: req.body,
    });
    res.send(createdPup);
  })
);

// PATCH /api/puppies/:puppyId
router.patch(
  "/:puppyId",
  asyncErrorHandler(async (req, res, next) => {
    const updatedPup = await prisma.puppies.update({
      where: {
        id: +req.params.puppyId,
      },
      data: req.body,
    });
    res.send(updatedPup);
  })
);

// DELETE /api/puppies
router.delete(
  "/:puppyId",
  asyncErrorHandler(async (req, res, next) => {
    const deletedPup = await prisma.puppies.delete({
      where: {
        id: +req.params.puppyId,
      },
    });
    res.send(deletedPup);
  })
);

module.exports = router;
