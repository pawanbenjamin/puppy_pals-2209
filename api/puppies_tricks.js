const router = require("express").Router();
const prisma = require("../prisma/prisma");
const { asyncErrorHandler } = require("./utils");

// Add a trick to puppy
// POST /api/puppies_tricks/:puppy_id/:trick_id
router.post(
  "/:puppy_id/:trick_id",
  asyncErrorHandler(async (req, res, next) => {
    const { puppy_id, trick_id } = req.params;
    const pt = await prisma.puppies_Tricks.create({
      data: {
        puppy_id: +puppy_id,
        trick_id: +trick_id,
      },
    });
    res.send(pt);
  })
);

// Remove a trick from puppy
// DELETE /api/puppies_tricks/:puppy_id/:trick_id
router.delete(
  "/:puppy_id/:trick_id",
  asyncErrorHandler(async (req, res, next) => {
    const { puppy_id, trick_id } = req.params;
    const pt = await prisma.puppies_Tricks.findUnique({
      where: {
        puppy_id: +puppy_id,
        AND: [
          {
            trick_id: +trick_id,
          },
        ],
      },
    });

    // const deletedPt = await prisma.puppies_Tricks.delete({
    //   where: {
    //     AND: {
    //       puppy_id: +puppy_id,
    //       trick_id: +trick_id,
    //     },
    //   },
    // });
    res.send(pt);
  })
);

module.exports = router;
