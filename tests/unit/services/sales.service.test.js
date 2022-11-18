const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { 
  saleInsert,
  saleInsertModel,
  insertServiceSale,
  tableSales,
  salesById,
  serviceSaleResponse,
  updateSaleService,
  saleNotFoundMessage,
 } = require('../../mocks/sales.mock');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/product.model');
const { HTTP_NOT_FOUND } = require('../../../src/utils/errorsMap');

describe('Testes da camada Service das Vendas.', function () { 
  afterEach(sinon.restore)

  it('Verifica se exibe todas as vendas;', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(tableSales);
  
    const response = { type: null, message: tableSales }
    const salesById = await salesService.getSales();
  
    expect(salesById).to.be.deep.equal(response);
  });

  it('Verifica as vendas pelo ID;', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(salesById);

    const result = await salesService.getSalesById(1);

    expect(result).to.be.a('object');
  });

  it('Verifica se retorna uma mensagem de erro quando não encontra a venda;', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(undefined);

    const response = { type: HTTP_NOT_FOUND, message: saleNotFoundMessage.message };
    const sale = await salesService.getSalesById(99);

    expect(sale).to.be.deep.equal(response);
  });

  it('Verifica se insere corretamente uma venda;', async function () {
    sinon.stub(salesModel, 'insertSales').resolves(saleInsertModel);
    sinon.stub(salesModel, 'getSalesId').resolves(4);

    const response = { type: null, message: insertServiceSale }
    const sales = await salesService.insertSales(saleInsert)

    expect(sales).to.be.deep.equal(response);
  });

  it('Verifica se atualiza/modifica uma venda corretamente', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(serviceSaleResponse);
    sinon.stub(salesModel, 'getSalesById').resolves([true]);
    sinon.stub(salesModel, 'updateSales').resolves({ id: 1, productId: 1, quantity: 5 });

    const response = { type: null, message: { saleId: 1, itemsUpdated: updateSaleService } };
    const result = await salesService.updateSale(1, salesById);

    expect(result).to.be.deep.equal(response);
  });

  it('Verifica se retorna erro ao atualizar/modificar uma venda com ID inexistente', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(true);
    sinon.stub(salesModel, 'getSalesById').resolves([]);
  
    const response = { type: HTTP_NOT_FOUND, message: 'Sale not found' };
    const updatedSale = await salesService.updateSale(9999, salesById);
  
    expect(updatedSale).to.be.deep.equal(response);
  });

  it('Verifica se retorna erro ao atualizar/modificar uma venda com produto inexistente', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(undefined);
  
    const response = { type: HTTP_NOT_FOUND, message: 'Product not found' };
    const product = await salesService.updateSale(9999, salesById);

    expect(product).to.be.deep.equal(response);
  });

  it('Verifica se é possível deletar uma venda pelo seu ID;', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(1);
    sinon.stub(salesModel, 'deleteSale').resolves(1);

    const response = { type: null, message: 1 };
    const deleted = await salesService.deleteSale(1);

    expect(deleted).to.be.deep.equal(response);
  });

  it('Verifica se retorna erro ao deletar uma venda com ID inexistente;', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(null);

    const result = await salesService.deleteSale(1);

    expect(result).to.be.a('object');
    expect(result).to.be.deep.equal({
      type: HTTP_NOT_FOUND,
      message: saleNotFoundMessage.message,
    });
  });
});
