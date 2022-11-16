const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { 
  saleInsert,
  saleInsertModelReturn,
  saleInsertModel,
 } = require('../../mocks/sales.mock');
const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/db/connection');

describe('Testes da camada Model das Vendas.', function () { 
  afterEach(sinon.restore)

  it('Verifica se retorna o ID;', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await salesModel.getSalesId(saleInsert);

    expect(result).to.be.equal(4);
  });

  it('Verifica se exibe todos os produtos;', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const sales = await salesModel.insertSales(4, saleInsertModel);

    expect(sales).to.be.deep.equal(saleInsertModelReturn);
  });
});
