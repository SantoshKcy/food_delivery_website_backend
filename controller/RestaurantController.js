const Restaurant = require('../model/Restaurant');

const findAll = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (e) {
        res.json(e)
    }



}
const save = async (req, res) => {
    try {
        const { name, description, address, phoneNumber, email, openHours, closeHours, rating } = req.body
        const restaurant = new Restaurant({
            name,
            description,
            address,
            phoneNumber,
            email,
            openHours,
            closeHours,
            rating,
            image: req.file.originalname

        });
        await item.save();
        res.status(201).json(restaurant)
    } catch (e) {
        res.json(e)
    }

}

const findById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.status(200).json(restaurant)
    } catch (e) {
        res.json(e)

    }


}
const deleteById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {
        res.json(e)

    }


}
const update = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(restaurant)
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