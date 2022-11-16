const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const {
  saleControllerInsert,
  invalidSale,
  ProductNotFoundMessage,
} = require('../../mocks/sales.mock');
const { HTTP_NOT_FOUND } = require('../../../src/utils/errorsMap');

describe('Testes da camada Controller das Vendas.', function () {
  afterEach(sinon.restore);

  it('Verifica se é possível cadastrar uma venda;', async function () {
    sinon.stub(salesService, 'insertSales').resolves(saleControllerInsert);

    const res = { };
    const req = { body: saleControllerInsert };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });

  it('Verifica se retorna erro caso o produto não seja encontrado;', async function () {
    sinon.stub(salesService, 'insertSales').resolves(null);
    const res = {};
    const req = { body: invalidSale };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
    expect(res.json).to.have.been.calledWith(ProductNotFoundMessage);
  });
});
