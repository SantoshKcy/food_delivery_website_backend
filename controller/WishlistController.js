const Wishlist = require('../model/Wishlist')
const findAll = async (req, res) => {
    try {
        const WishlistSchema = await Item.find().populate(["itemId", "customerId"]);
        res.status(200).json(wishlist);
    } catch (e) {
        res.json(e)
    }

}
const save = async (req, res) => {
    try {
        const { createdAt } = req.body
        const wishlist = new Wishlist({

            createdAt,


        });
        await wishlist.save();
        res.status(201).json(wishlist)
    } catch (e) {
        res.json(e)
    }

}
const findById = async (req, res) => {
    try {
        const wishlist = await Wishlist.findById(req.params.id);
        res.status(200).json(wishlist)
    } catch (e) {
        res.json(e)

    }


}
const deleteById = async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)

    }


}


module.exports = {
    findAll,
    save,
    findById,
    deleteById,


}