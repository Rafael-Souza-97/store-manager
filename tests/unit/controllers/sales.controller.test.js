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
  saleNotFoundMessage,
  tableSales,
  salesById,
} = require('../../mocks/sales.mock');
const { productNotFoundMessage } = require('../../mocks/products.mock');
const { HTTP_NOT_FOUND } = require('../../../src/utils/errorsMap');

describe('Testes da camada Controller das Vendas.', function () {
  afterEach(sinon.restore);

  it('Verifica se é possível exibir todos as vendas;', async function () {
    sinon.stub(salesService, 'getSales').resolves({ type: null, message: tableSales });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(tableSales);
  });

  it('Verifica se retorna erro caso não encontre as vendas;', async function () {
    sinon.stub(salesService, 'getSales').resolves({ type: HTTP_NOT_FOUND, message: 'Os Produtos não foram encontrados' });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
    expect(res.json).to.have.been.calledWith({ message: 'Os Produtos não foram encontrados' });
  });

  it('Verifica se é possível exibir a venda do ID requisitado;', async function () {
    sinon.stub(salesService, 'getSalesById').resolves({ type: null, message: salesById });

    const req = { params: { id: 1 } };
    const res = {};


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesById);
  });
  
  it('Verifica se retorna status 404 - "Sale not found" se o ID não for encontrado;', async function () {
    sinon.stub(salesService, 'getSalesById').resolves({ type: HTTP_NOT_FOUND, message: 'Sale not found' });

    const req = { params: { id: 99 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
    expect(res.json).to.have.been.calledWith(saleNotFoundMessage);
  });

  it('Verifica se é possível inserir uma nova venda;', async function () {
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
    expect(res.json).to.have.been.calledWith(productNotFoundMessage);
  });

  it('Verifica se é possível atualizar/modificar uma venda pelo seu ID;', async function () {
    sinon.stub(salesService, 'updateSale').resolves({ type: null, message: { saleId: 1, itemsUpdated: tableSales }});

    const req = { body: { tableSales }, params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: 1, itemsUpdated: tableSales });;
  });

  it('Verifica se é possível atualizar/modificar uma venda pelo seu ID;', async function () {
    sinon.stub(salesService, 'updateSale').resolves({ type: null, message: { saleId: 1, itemsUpdated: tableSales }});

    const req = { body: { tableSales }, params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: 1, itemsUpdated: tableSales });;
  });

  it('Verifica se retorna erro ao atualizar/modificar caso os dados estejam incorretos;', async function () {
    sinon.stub(salesService, 'updateSale')
    .resolves({ type: 500, message: 'Erro Interno do Servidor' });

    const req = { params: { id :1 }, body: saleControllerInsert  };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Erro Interno do Servidor' });
  });

  it('Verifica se é retornado um erro em caso de falha ao deletar uma venda pelo seu ID;', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({
      type: null, message: 1
    });

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res); 
    res.json = sinon.stub().returns();

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Verifica se é retornado um erro em caso de falha ao deletar uma venda pelo seu ID;', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({
      type: HTTP_NOT_FOUND, message: saleNotFoundMessage.message,
    });

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res); 
    res.json = sinon.stub().returns();

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
    expect(res.json).to.have.been.calledWith({ message: saleNotFoundMessage.message })
  });
});
