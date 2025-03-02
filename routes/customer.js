const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/uploads");

const {
    getCustomers,
    getCustomer,
    register,
    login,
    uploadImage,
    updateCustomer,
    updatePassword
} = require("../controllers/customer");

// Routes
router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);

// Restrict these routes to logged-in users
router.get("/getAllCustomers", getCustomers);
router.get("/getCustomer/:id", authorize("admin", "customer"), getCustomer);
router.put("/updateCustomer/:id", protect, upload.single("profilePicture"), updateCustomer);
router.put('/updatePassword/:id', protect, updatePassword); // For updating password

router.post("/uploadImage", protect, authorize("admin", "customer"), upload.single("profilePicture"), uploadImage);

module.exports = router;
