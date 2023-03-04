const express = require("express");
const router = express.Router();
const {
    createPainting,
    getPaintings,
    getPaintingById,
    updatePainting
} = require("../resolvers/painting");

router.get("/", getPaintings);

router.get("/:id", getPaintingById);

router.post("/", createPainting);

router.put("/:id", updatePainting);

// router.delete("/:id", async (req, res) => {
//     const painting = await Painting.findByIdAndRemove(req.params.id);

//     if (!painting) return res.status(404).send("Painting not found");

//     res.json(painting);
// });

module.exports = router;
