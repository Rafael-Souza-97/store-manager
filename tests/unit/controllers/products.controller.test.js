const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { allProducts, idProduct } = require('../../mocks/products.mock');
const productsController = require('../../../src/controllers/product.controller');
const productsService = require('../../../src/services/product.service');

describe('Testes da camada Controller dos Produtos.', function () {
  afterEach(sinon.restore);

  it('Exibir todos os produtos;', async function () {
    const req = {};
    const res = {};

    sinon.stub(productsService, 'getProducts').resolves({ type: null, message: allProducts });

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Retorna erro caso não encontre os produtos;', async function () {
    const req = {};
    const res = {};

    sinon.stub(productsService, 'getProducts').resolves({ type: 404, message: 'Os Produtos não foram encontrados' });

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Os Produtos não foram encontrados' });
  });

  it('Exibir o produto do ID requisitado;', async function () {
    sinon.stub(productsService, 'getProductsById').resolves({ type: null, message: idProduct });

    const req = { params: { id: 1 } };
    const res = {};


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(idProduct);
  });
  
  it('Retorna status 404 - "Product not found" se o ID não for encontrado;', async function () {
    sinon.stub(productsService, 'getProductsById').resolves({ type: 404, message: 'Product not found' });

    const req = { params: { id: 99 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Verifica se é possível adicionar novo produto;', async function () {
    sinon.stub(productsService, 'insertProduct')
    .resolves({ type: null, message: { id: 4, name: "Novo Produto" } });

    const req = { body: { name: 'Novo Produto' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'Novo Produto' });
  });

  it('Verifica se é retornado um erro em caso de falha no servidor;', async function () {
    sinon.stub(productsService, 'insertProduct')
    .resolves({ type: 500, message: 'Erro Interno do Servidor' });

    const req = { body: { name: 'Novo Produto' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Erro Interno do Servidor' });
  });
});
