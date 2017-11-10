const Joi = require('joi');

const paymentDefinition = Joi.object().keys({
    amount: Joi.number().precision(2).positive().greater(0).required(),
    method: Joi.string().alphanum().valid('cash', 'card', 'online').required(),
    currency: Joi.string().alphanum().min(3).max(3).required(),
    booking_id: Joi.number().integer().required()
});

module.exports = paymentDefinition;
