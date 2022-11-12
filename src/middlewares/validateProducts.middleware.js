const { nameValidation } = require('./schemas');
const { HTTP_BAD_REQUEST } = require('../utils/errorsMap');

const productNameValidation = (req, res, next) => {
  const { name } = req.body;
  const isNameValidated = nameValidation.validate({ name });

  if (isNameValidated.error) { 
    return res.status(HTTP_BAD_REQUEST).json({ 
      message: '"name" is required',
    });
  }

  return next();
};

module.exports = { productNameValidation };