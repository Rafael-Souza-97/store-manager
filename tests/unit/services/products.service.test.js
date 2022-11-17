const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { allProducts, idProduct, productNotFoundMessage } = require('../../mocks/products.mock');
const productsModel = require('../../../src/models/product.model');
const productsService = require('../../../src/services/product.service');
const { HTTP_NOT_FOUND, HTTP_UNPROCESSABLE_ENTITY } = require('../../../src/utils/errorsMap')

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

    const response = { type: HTTP_NOT_FOUND, message: productNotFoundMessage.message };
    const product = await productsService.getProductsById(99);

    expect(product).to.be.deep.equal(response);
  });

  it('Verifica se retorna o produto adicionado;', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves([{ idProduct: 4 }]);
    sinon.stub(productsModel, 'getProductsById').resolves({ name: "Capa do Homem de Ferro" });

    const response = { type: null, message: { name: "Capa do Homem de Ferro" }};
    const product = await productsService.insertProduct({ name: "Capa do Homem de Ferro" });

    expect(product).to.be.deep.equal(response);
  });

  it('Verifica se retorna erro ao passar o "name" com menos de 5 caracteres;', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(5);

    const response = { type: HTTP_UNPROCESSABLE_ENTITY, message: '\"name\" length must be at least 5 characters long'};
    const product = await productsService.insertProduct({ name: 'test' });

    expect(product).to.be.deep.equal(response);
  });

  it('Verifica se é possível atualizar/modificar um produto pelo seu ID;', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(1);
    sinon.stub(productsModel, 'updateProducts').resolves({ id: 1, name: "Capa do Homem de Ferro" });

    const response = { type: null, message: { id: 1, name: "Capa do Homem de Ferro" }};
    const result = await productsService.updateProduct(1, { name: "Capa do Homem de Ferro" });

    expect(result).to.be.deep.equal(response);
  });

  it('Verifica se retorna erro ao atualizar/modificar um produto com ID inexistente;', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(undefined);

    const product = await productsService.updateProduct(999, { name: "Capa do Homem de Ferro" });

    expect(product).to.be.a('object');
    expect(product.type).to.be.equal(404)
  });

  it('Verifica se ao atualizar/modificar os dados, retorna erro ao passar o "name" com menos de 5 letras;', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(5);

    const response = { type: HTTP_UNPROCESSABLE_ENTITY, message: '\"name\" length must be at least 5 characters long'};
    const product = await productsService.updateProduct(1, { name: 'test' });

    expect(product).to.be.deep.equal(response);
  });

  it('Verifica se é possível deletar um produto pelo seu ID;', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(1);
    sinon.stub(productsModel, 'deleteProduct').resolves(1);

    const response = { type: null, message: 1 };
    const deleted = await productsService.deleteProduct(1);

    expect(deleted).to.be.deep.equal(response);
  });

  it('Verifica se retorna erro ao deletar um produto com ID inexistente;', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(null);

    const result = await productsService.deleteProduct(1);

    expect(result).to.be.a('object');
    expect(result).to.be.deep.equal({
      type: HTTP_NOT_FOUND,
      message: productNotFoundMessage.message,
    });
  });
});
