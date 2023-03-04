const mongoose = require("mongoose");
const Joi = require("joi");

const paintingSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    paintingType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Painting = mongoose.model("Painting", paintingSchema);

function validatePainting(painting) {
    const schema = Joi.object({
        title: Joi.string().required(),
        paintingType: Joi.string().required(),
        price: Joi.number().required()
    });

    return schema.validate(painting);
}

module.exports = {
    Painting,
    validatePainting
};
