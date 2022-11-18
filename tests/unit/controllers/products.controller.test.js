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

  it('Verifica se é possível exibir todos os produtos;', async function () {
    const req = {};
    const res = {};

    sinon.stub(productsService, 'getProducts').resolves({ type: null, message: allProducts });

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Verifica se retorna erro caso não encontre os produtos;', async function () {
    const req = {};
    const res = {};

    sinon.stub(productsService, 'getProducts').resolves({ type: 404, message: 'Os Produtos não foram encontrados' });

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Os Produtos não foram encontrados' });
  });

  it('Verifica se exibe o produto do ID requisitado;', async function () {
    sinon.stub(productsService, 'getProductsById').resolves({ type: null, message: idProduct });

    const req = { params: { id: 1 } };
    const res = {};


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(idProduct);
  });
  
  it('Verifica se retorna status 404 - "Product not found" se o ID não for encontrado;', async function () {
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
    .resolves({ type: null, message: { id: 4, name: "Capa do Homem de Ferro" } });

    const req = { body: { name: 'Capa do Homem de Ferro' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'Capa do Homem de Ferro' });
  });

  it('Verifica se é retornado um erro em caso de falha no servidor;', async function () {
    sinon.stub(productsService, 'insertProduct')
    .resolves({ type: 500, message: 'Erro Interno do Servidor' });

    const req = { body: { name: 'Capa do Homem de Ferro' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Erro Interno do Servidor' });
  });

  it('Verifica se é possível atualizar/modificar um produto pelo seu ID;', async function () {
    sinon.stub(productsService, 'updateProduct').resolves({ type: null, message: { id: 1, name: "Capa do Homem de Ferro" }});

    const req = { params: { id: 1 }, body: { name: "Capa do Homem de Ferro" } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: "Capa do Homem de Ferro" });;
  });

  it('Verifica se retorna erro ao passar o "name" com menos de 5 caracteres;', async function () {
    sinon.stub(productsService, 'updateProduct').resolves({ type: 422, message: '\"name\" length must be at least 5 characters long'});

    const req = { params: { id: 1 }, body: { name: "test" } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const product = await productsController.updateProduct(req, res);

    expect(product).to.be.undefined;
  });

  it('Verifica se é retornado um erro em caso de falha ao deletar um produto pelo seu ID;', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves({
      type: null, message: 1
    });

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res); 
    res.json = sinon.stub().returns();

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Verifica se é retornado um erro em caso de falha ao deletar um produto pelo seu ID;', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves({
      type: 404, message: 'Product not found'
    });

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res); 
    res.json = sinon.stub().returns();

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message:'Product not found'})
  });
});
