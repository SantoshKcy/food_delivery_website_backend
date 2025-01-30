const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const upload = require("../middleware/uploads");

const {
    getCustomers,
    getCustomer,
    register,
    login,
    uploadImage,

} = require("../controllers/customer");


router.post("/uploadImage", upload, uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/getAllCustomers", protect, getCustomers);
router.get("/getAllCustomer", protect, getCustomer);

module.exports = router;