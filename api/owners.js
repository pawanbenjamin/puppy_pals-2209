const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");
const prisma = require("../prisma/prisma");

// GET /api/owners
router.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const owners = await prisma.owners.findMany();
    res.send(owners);
  })
);
// GET /api/owners/:ownerId
router.get(
  "/:ownerId",
  asyncErrorHandler(async (req, res, next) => {
    const owner = await prisma.owners.findUnique({
      where: {
        id: +req.params.ownerId,
      },
    });
    res.send(owner);
  })
);

// POST /api/owners
router.post(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const newOwner = await prisma.owners.create({
      data: req.body,
    });
    res.send(newOwner);
  })
);

// PATCH /api/owners/:ownerId
router.patch(
  "/:ownerId",
  asyncErrorHandler(async (req, res, next) => {
    const updatedOwner = await prisma.owners.update({
      where: {
        id: +req.params.ownerId,
      },
      data: req.body,
    });
    res.send(updatedOwner);
  })
);

// DELETE /api/owners/:ownerId
router.delete(
  "/:ownerId",
  asyncErrorHandler(async (req, res, next) => {
    const deletedOwner = await prisma.owners.delete({
      where: {
        id: +req.params.ownerId,
      },
    });
    res.send(deletedOwner);
  })
);

module.exports = router;
