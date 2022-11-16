const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { allProducts, idProduct } = require('../../mocks/products.mock');
const productsModel = require('../../../src/models/product.model');
const connection = require('../../../src/models/db/connection');

describe('Testes da camada Model dos Produtos.', function () { 
  afterEach(sinon.restore)

  it('Verifica se exibe todos os produtos;', async function () {
    sinon.stub(connection, 'execute').resolves(allProducts);
    const products = await productsModel.getAllProducts();
    expect(products).to.be.deep.equal(allProducts[0]);;
  });

  it('Verifica se exibe os produtos pelo ID;', async function () {
    sinon.stub(connection, 'execute').resolves([[idProduct]]);
    const products = await productsModel.getProductsById();
    expect(products).to.be.deep.equal(idProduct);
  });

  it('Verifica se ao adicionar novo produto, retorna o ID correto;', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 99 }]);
    const newProductId = await productsModel.insertProduct('ProdutoX');
    expect(newProductId).to.be.deep.equal(99);
  });
});
