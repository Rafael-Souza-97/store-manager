const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { 
  saleInsert,
  saleInsertModel,
  insertServiceSale,
 } = require('../../mocks/sales.mock');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

describe('Testes da camada Service das Vendas.', function () { 
  afterEach(sinon.restore)

  it('Verifica se exibe todos os produtos;', async function () {
    sinon.stub(salesModel, 'insertSales').resolves(saleInsertModel);
    sinon.stub(salesModel, 'getSalesId').resolves(4);

    const response = { type: null, message: insertServiceSale }
    const sales = await salesService.insertSales(saleInsert)

    expect(sales).to.be.deep.equal(response);
  });
});