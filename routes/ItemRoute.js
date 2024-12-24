const express = require("express")

const router = express.Router();
const { findAll, save, findById, deleteById, update } = require("../controller/ItemController");
const { authenticateToken, authorizeRole } = require("../security/Auth")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'Item_images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)

    }
})

const upload = multer({ storage })
router.get("/", authenticateToken, authorizeRole("Admin"), findAll);
router.post("/", upload.single('file'), authenticateToken, save);
router.get("/:id", findById);
router.delete("/:id", authenticateToken, deleteById);
router.put("/:id", authenticateToken, update)



module.exports = router;

