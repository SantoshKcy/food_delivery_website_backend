const joi = require("joi");
const itemSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().required(),
    subacategoryId: joi.string().required()

})

function ItemValidation(req, res, next) {
    const { name, description, price, image, subacategoryId } = req.body;
    const { error } = customerSchema.validate({ name, description, price, image, subacategoryId })
    if (error) {
        return res.json(error)
    }
    next()


}
module.exports = ItemValidation;

