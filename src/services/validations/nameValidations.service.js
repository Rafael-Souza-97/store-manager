const schema = require('../../middlewares/schemas');
const { HTTP_UNPROCESSABLE_ENTITY } = require('../../utils/errorsMap');

const nameValidation = (name) => {
  const { error } = schema.nameLengthValidation.validate(name);

  if (error) {
    return { 
      type: HTTP_UNPROCESSABLE_ENTITY, message: '"name" length must be at least 5 characters long',
    };  
  }

  return { type: null, message: 'HTTP_STATUS_OK' };
};

module.exports = { nameValidation };
