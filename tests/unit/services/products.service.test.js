const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { allProducts, idProduct } = require('../../mocks/products.controller.mock');
const productsModel = require('../../../src/models/product.model');
const productsService = require('../../../src/services/product.service');

describe('Testes da camada Service dos Produtos.', function () { 
  afterEach(sinon.restore)

  it('Verifica se exibe todos os produtos;', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);

    const response = { type: null, message: allProducts }
    const products = await productsService.getProducts();

    expect(products).to.be.deep.equal(response);
  });

  it('Verifica se exibe o produto com o ID requisitado;', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(idProduct);

    const product = await productsService.getProductsById(1);

    expect(product.message).to.be.deep.equal(idProduct);
  });

  it('Verifica se o ID é válido;', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(undefined);

    const response = { type: 404, message: 'Product not found' };
    const product = await productsService.getProductsById(99);

    expect(product).to.be.deep.equal(response);
  });

  it('Verifica se retorna o produto adicionado;', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(1);

    const response = { type: null, message: idProduct };
    const product = await productsService.insertProduct({ name: 'Martelo do Thor' });

    expect(product).to.be.deep.equal(response);

    sinon.restore
  });

  it('Verifica se retorna erro ao passar o "name" com menos de 5 caracteres;', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(5);

    const response = { type: 422, message: '\"name\" length must be at least 5 characters long'};
    const product = await productsService.insertProduct({ name: 'test' });

    expect(product).to.be.deep.equal(response);
  });
});
