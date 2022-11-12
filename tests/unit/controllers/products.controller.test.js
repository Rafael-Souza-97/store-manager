const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { allProducts, idProduct } = require('../../mocks/products.controller.mock');
const productsController = require('../../../src/controllers/product.controller');
const productsService = require('../../../src/services/product.service');

describe('Teste a camada Controller dos Produtos. Ela deve retornar os produtos.', function () {
  afterEach(sinon.restore);

  it('Exibir todos os produtos', async function () {
    const req = {};
    const res = {};

    sinon.stub(productsService, 'getProducts').resolves({ type: null, message: allProducts });

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Retorna erro caso não encontre os produtos', async function () {
    const req = {};
    const res = {};

    sinon.stub(productsService, 'getProducts').resolves({ type: 404, message: 'Os Produtos não foram encontrados' });

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Os Produtos não foram encontrados' });
  });

  it('Teste a camada Controller dos Produtos. Ela deve retornar os produtos via ID.', async function () {
    sinon.stub(productsService, 'getProductsById').resolves({ type: null, message: idProduct });

    const req = { params: { id: 1 } };
    const res = {};


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(idProduct);
  });
  
  it('Retorna status 404 com a mensagem "Product not found" se o ID não for encontrado', async function () {
    sinon.stub(productsService, 'getProductsById').resolves({ type: 404, message: 'Product not found' });

    const req = { params: { id: 99 } };
    const res = {};


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});
