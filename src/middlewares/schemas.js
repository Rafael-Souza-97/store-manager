const joi = require('joi');

const nameValidation = joi.object({
  name: joi.string().min(3).required(),
}).required();

const nameLengthValidation = joi.string().min(5).required();

const salesValidation = joi.object({
  productId: joi.number().integer().required(),
}).required();

module.exports = {
  nameValidation,
  nameLengthValidation,
  salesValidation,
};