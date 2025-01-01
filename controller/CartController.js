const Cart = require('../model/Cart')
const findAll = async (req, res) => {
    try {
        const cartSchema = await Item.find().populate(["itemId", "customerId", "restaurantId"]);
        res.status(200).json(carts);
    } catch (e) {
        res.json(e)
    }

}
const save = async (req, res) => {
    try {
        const { quantity, price, createdAt } = req.body
        const cart = new Cart({
            quantity,
            price,
            createdAt,


        });
        await cart.save();
        res.status(201).json(cart)
    } catch (e) {
        res.json(e)
    }

}
const findById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart)
    } catch (e) {
        res.json(e)

    }


}
const deleteById = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)

    }


}
const update = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(cart)
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