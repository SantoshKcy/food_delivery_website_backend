const Item = require('../model/Item')
const findAll = async (req, res) => {
    try {
        const items = await Item.find().populate(["subacategoryId"]);
        res.status(200).json(items);
    } catch (e) {
        res.json(e)
    }

}
const save = async (req, res) => {
    try {
        const { name, description, price } = req.body
        const item = new Item({
            name,
            description,
            price,
            image: req.file.originalname

        });
        await item.save();
        res.status(201).json(item)
    } catch (e) {
        res.json(e)
    }

}
const findById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).json(item)
    } catch (e) {
        res.json(e)

    }


}
const deleteById = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)

    }


}
const update = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(item)
    } catch (e) {
        res.json(e)

    }


}

module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update

}