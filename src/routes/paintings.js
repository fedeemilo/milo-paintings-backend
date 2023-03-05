const express = require("express");
const router = express.Router();
const {
    createPainting,
    getPaintings,
    getPaintingById,
    updatePainting,
    DeletePainting
} = require("../resolvers/painting");

router.get("/", getPaintings);

router.get("/:id", getPaintingById);

router.post("/", createPainting);

router.put("/:id", updatePainting);

router.delete("/:id", DeletePainting);

module.exports = router;
