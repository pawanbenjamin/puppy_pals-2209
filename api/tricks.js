const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");
const prisma = require("../prisma/prisma");

// GET /api/tricks
router.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const tricks = await prisma.tricks.findMany();
    res.send(tricks);
  })
);

// GET /api/tricks/:trickId
router.get(
  "/:trickId",
  asyncErrorHandler(async (req, res, next) => {
    const trick = await prisma.tricks.findUnique({
      where: {
        id: +req.params.trickId,
      },
    });
    res.send(trick);
  })
);

// POST /api/tricks
router.post(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const createdTrick = await prisma.tricks.create({
      data: req.body,
    });
    res.send(createdTrick);
  })
);

// PATCH /api/tricks/:trickId
router.patch(
  "/:trickId",
  asyncErrorHandler(async (req, res, next) => {
    const updatedTrick = await prisma.tricks.update({
      where: {
        id: +req.params.trickId,
      },
      data: req.body,
    });
    res.send(updatedTrick);
  })
);

// DELETE /api/tricks/:trickId
router.delete(
  "/:trickId",
  asyncErrorHandler(async (req, res, next) => {
    const deletedTrick = await prisma.tricks.delete({
      where: {
        id: +req.params.trickId,
      },
    });
    res.send(deletedTrick);
  })
);

module.exports = router;
