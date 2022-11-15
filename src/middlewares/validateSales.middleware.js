const { HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } = require('../utils/errorsMap');

const verification = async (body) => {
  const saleValidation = await Promise.all(body.map(({ productId, quantity }) => {
    if (productId === undefined) { 
      return 'Erro no productId';
     }

    if (quantity === undefined) {
      return '"quantity" is required';
    }
  
    if (quantity < 0 || quantity === 0) {
      return '"quantity" must be greater than or equal to 1';
    }

    return 'HTTP_STATUS_OK';
  }));

  return saleValidation;
};

const saleValidation = async (req, res, next) => {
  const sales = req.body;

  const verifications = await verification(sales);

  if (verifications.includes('Erro no productId')) {
    return res.status(HTTP_BAD_REQUEST).json({ message: '"productId" is required' });
  }

  if (verifications.includes('"quantity" is required')) {
    return res.status(HTTP_BAD_REQUEST).json({ message: '"quantity" is required' });
  }

  if (verifications.includes('"quantity" must be greater than or equal to 1')) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const allValidatesOk = verifications.every((string) => string === 'HTTP_STATUS_OK');

  if (allValidatesOk) {
    return next();
  }
};

module.exports = {
  saleValidation,
};
