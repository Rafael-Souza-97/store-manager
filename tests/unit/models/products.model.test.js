const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { allProducts, idProduct } = require('../../mocks/products.controller.mock');
const productsModel = require('../../../src/models/product.model');
const connection = require('../../../src/models/db/connection');

describe('Teste a camada Model dos Produtos.', function () { 
  afterEach(sinon.restore)

  it('Verifica se exibe todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves(allProducts);
    const products = await productsModel.getAllProducts();
    expect(products).to.be.deep.equal(allProducts[0]);;
  });

  it('Verifica se exibe os produtos pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([idProduct]);
    const products = await productsModel.getProductsById();
    expect(products).to.be.deep.equal(idProduct);;
  });
});
