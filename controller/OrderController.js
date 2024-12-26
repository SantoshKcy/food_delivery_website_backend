const Order = require('../model/Order')
const findAll = async (req, res) => {
    try {
        const orders = await Order.find().populate(["customerId", "itemId",]);
        res.status(200).json(books);
    } catch (e) {
        res.json(e)
    }


    // const customers=await Customer.find();
    // res.status(200).json(customers);

}
const save = async (req, res) => {
    try {
        const orders = new Order(req.body);
        await orders.save();
        res.status(201).json(orders)
    } catch (e) {
        res.json(e)
    }

}


module.exports = {
    findAll,
    save
}