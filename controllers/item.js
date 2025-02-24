const asyncHandler = require("../middleware/async");
const Item = require("../models/Item");
const Category = require("../models/Category");
const Subcategory = require("../models/subcategory");

// @desc    Get all items
// @route   GET /api/v1/items
// @access  Public
exports.getItems = asyncHandler(async (req, res, next) => {
    const items = await Item.find().populate("category subcategory");

    res.status(200).json({
        success: true,
        count: items.length,
        data: items,
    });
});

// @desc    Get single item
// @route   GET /api/v1/items/:id
// @access  Public
exports.getItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category subcategory");

    if (!item) {
        return res.status(404).json({ message: `Item not found with id of ${req.params.id}` });
    }

    res.status(200).json({
        success: true,
        data: item,
    });
});

// @desc    Create new item
// @route   POST /api/v1/items
// @access  Private (Admin)
exports.createItem = asyncHandler(async (req, res, next) => {
    const { name, description, price, availability, category, subcategory, tags } = req.body;
    const image = req.file ? req.file.filename : null;
    // Check if item already exists
    const existingItem = await Item.findOne({ name });

    if (existingItem) {
        return res.status(400).json({ message: "Item already exists" });
    }

    // Validate category and subcategory
    const foundCategory = await Category.findById(category);
    const foundSubcategory = await Subcategory.findById(subcategory);

    if (!foundCategory || !foundSubcategory) {
        return res.status(400).json({ message: "Invalid category or subcategory" });
    }

    const item = await Item.create({
        name,
        description,
        price,
        availability,
        category,
        subcategory,
        tags: tags ? tags.split(",").map(tag => tag.trim()) : [], // Convert tags string to array
        image,
    });

    res.status(201).json({
        success: true,
        message: "Item created successfully",
        data: item,
    });
});

// @desc    Update item
// @route   PUT /api/v1/items/:id
// @access  Private (Admin)
exports.updateItem = asyncHandler(async (req, res, next) => {
    let item = await Item.findById(req.params.id);
    if (!item) {
        return res.status(404).json({ message: `Item not found with id of ${req.params.id}` });
    }

    const { name, description, price, availability, category, subcategory, tags } = req.body;
    const image = req.file ? req.file.filename : item.image;

    // Validate category and subcategory if provided
    if (category) {
        const foundCategory = await Category.findById(category);
        if (!foundCategory) {
            return res.status(400).json({ message: "Invalid category" });
        }
    }

    if (subcategory) {
        const foundSubcategory = await Subcategory.findById(subcategory);
        if (!foundSubcategory) {
            return res.status(400).json({ message: "Invalid subcategory" });
        }
    }

    item = await Item.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            price,
            availability,
            category,
            subcategory,
            tags: tags ? tags.split(",").map(tag => tag.trim()) : item.tags, // Convert tags string to array
            image,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: "Item updated successfully",
        data: item,
    });
});

// @desc    Delete item
// @route   DELETE /api/v1/items/:id
// @access  Private (Admin)
exports.deleteItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        return res.status(404).json({ message: `Item not found with id of ${req.params.id}` });
    }

    await item.deleteOne();

    res.status(200).json({
        success: true,
        message: "Item deleted successfully",
    });
});
exports.getItemsByTags = async (req, res) => {
    try {
        // Fetch all items from the database and populate category and subcategory
        const items = await Item.find().populate("category subcategory");

        // Initialize an object to hold items by tags
        const categorizedItems = {
            Featured: [],
            Popular: [],
            Trending: [],
            Special: [],
        };

        // Iterate through the items and group them by tags
        items.forEach(item => {
            item.tags.forEach(tag => {
                // Check if the tag exists in the categorizedItems object
                if (categorizedItems[tag]) {
                    categorizedItems[tag].push(item);
                }
            });
        });

        // Return the categorized items as a JSON response
        res.status(200).json(categorizedItems);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Failed to fetch items" });
    }
};
