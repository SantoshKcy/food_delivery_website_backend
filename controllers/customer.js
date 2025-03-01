const asyncHandler = require("../middleware/async");
const Customer = require("../models/Customer");
const { protect, authorize } = require("../middleware/auth"); // Import RBAC Middleware
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");


// @desc    Get all customers (Admin Only)
// @route   GET /api/v1/customers
// @access  Private (Admin)
exports.getCustomers = asyncHandler(async (req, res, next) => {


    const customers = await Customer.find({});
    res.status(200).json({
        success: true,
        count: customers.length,
        data: customers,
    });
});

// @desc    Get single customer (Only Admin or the Customer Himself)
// @route   GET /api/v1/customers/:id
// @access  Private (Admin or User)
exports.getCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        return res.status(404).json({ message: `Customer not found with id ${req.params.id}` });
    }

    // Allow access only if admin or the customer himself
    if (req.user.role !== "admin" && req.user.id !== customer.id) {
        return res.status(403).json({ message: "Access denied." });
    }

    res.status(200).json({
        success: true,
        data: customer,
    });
});

// @desc    Register new customer
// @route   POST /api/v1/customers/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { fname, lname, phone, email, password, role } = req.body;
    const image = req.file ? req.file.filename : null;

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
        return res.status(400).json({ message: "User already exists." });
    }

    const customer = await Customer.create({
        fname,
        lname,
        phone,
        email,
        password,
        image,
        role: role || "customer", // Default role is "user"
    });

    sendTokenResponse(customer, 201, res);
});

// @desc    Login customer
// @route   POST /api/v1/customers/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide an email and password" });
    }

    const customer = await Customer.findOne({ email }).select("+password");

    if (!customer || !(await customer.matchPassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    sendTokenResponse(customer, 200, res);
});

// @desc    Update customer profile (Only Admin or the Customer Himself)
// @route   PUT /api/v1/customers/update/:id
// @access  Private (Admin or User)
exports.updateCustomer = asyncHandler(async (req, res, next) => {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).json({ message: `Customer not found with id ${req.params.id}` });
    }

    // Only allow update if admin or the customer himself
    if (req.user.role !== "admin" && req.user.id !== customer.id) {
        return res.status(403).json({ message: "Access denied." });
    }

    const { fname, lname, phone, email, role } = req.body;
    let image = customer.image;

    // Check if a new image is uploaded
    if (req.file) {
        if (customer.image) {
            const imagePath = path.join(__dirname, "../public/uploads", customer.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        image = req.file.filename;
    }

    // Only an admin can change the role
    const updatedData = req.user.role === "admin" ? { fname, lname, phone, email, image, role } : { fname, lname, phone, email, image };

    customer = await Customer.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: "Customer updated successfully",
        data: customer,
    });
});
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    // Ensure both oldPassword and newPassword are provided
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old and new passwords are required" });
    }

    // Find the customer by ID using req.params.id
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    // Check if the old password matches the current password
    const isMatch = await customer.matchPassword(oldPassword);
    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect old password" });
    }

    // Validate new password length
    if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mark the password as modified so that the pre-save hook skips hashing it again
    customer.password = hashedPassword;
    customer.isPasswordModified = true;

    // Save the updated customer document
    await customer.save();

    // Generate new JWT token after updating the password
    const token = customer.getSignedJwtToken();

    // Respond with success message and the new token
    res.status(200).json({
        success: true,
        message: "Password updated successfully",
        token, // Send the new token in the response
    });
});

// @desc    Delete Customer (Admin Only)
// @route   DELETE /api/v1/customers/:id
// @access  Private (Admin Only)
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    // Only allow admin to delete customer
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied." });
    }

    await customer.remove();
    res.status(200).json({ success: true, message: "Customer deleted successfully" });
});

// @desc    Upload Single Image
// @route   POST /api/v1/customers/upload
// @access  Private (Only Logged-in Users)
exports.uploadImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a file" });
    }

    res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: req.file.filename,
    });
});

// Get token from model, create cookie, and send response
const sendTokenResponse = (customer, statusCode, res) => {
    const token = customer.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            token,
            userId: customer._id,
            role: customer.role, // Include role in response
        });
};
