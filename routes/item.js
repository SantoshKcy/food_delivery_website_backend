const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/uploads"); // Ensure correct import

const {
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    getItemsByTags,

} = require("../controllers/item"); // Import item controller

// Route to create a new item (protected, admin only)
router.post("/createItem", protect, upload.single("itemImage"), createItem);

// Route to get all items
router.get("/getItems", getItems);

// Route to get a single item by ID
router.get("/getItem/:id", getItem);

// Route to update an item (protected, admin only)
router.put("/updateItem/:id", protect, upload.single("itemImage"), updateItem);

// Route to delete an item (protected, admin only)
router.delete("/deleteItem/:id", protect, deleteItem);

router.get("/items-by-tags", getItemsByTags);

module.exports = router;
