const express = require("express")
const router = express.Router();
const { findAll, save, findById, deleteById } = require("../controller/WishlistController");



router.get("/", findAll);
router.post("/", save);
router.get("/:id", findById);
router.delete("/:id", deleteById);




module.exports = router;

