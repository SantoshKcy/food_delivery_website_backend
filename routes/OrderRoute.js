const express = require("express")
const router = express.Router();
const { findAll, save } = require("../controller/OrderController");


router.get("/", findAll);
router.post("/", save);



module.exports = router;

