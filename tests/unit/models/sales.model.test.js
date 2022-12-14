const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { 
  saleInsert,
  saleInsertModelReturn,
  saleInsertModel,
  tableSales,
  salesById,
  updateSaleModel,
 } = require('../../mocks/sales.mock');
const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/db/connection');

describe('Testes da camada Model das Vendas.', function () { 
  afterEach(sinon.restore)

  it('Verifica se exibe todas as vendas;', async function () {
    sinon.stub(connection, 'execute').resolves([ tableSales ]);

    const result = await salesModel.getAllSales();
  
    expect(result).to.be.deep.equal(tableSales);
  });

  it('Verifica se exibe as vendas pelo ID;', async function () {
    sinon.stub(connection, 'execute').resolves([ salesById ]);

    const sale = await salesModel.getSalesById(1);

    expect(sale).to.be.deep.equal(salesById);
  });

  it('Verifica se retorna o ID;', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const id = await salesModel.getSalesId(saleInsert);

    expect(id).to.be.equal(4);
  });

  it('Verifica se insere todas as vendas;', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const sales = await salesModel.insertSales(4, saleInsertModel);

    expect(sales).to.be.deep.equal(saleInsertModelReturn);
  });

  it('Verifica se é possível atualizar/Modificar uma venda através do seu ID;', async function () {
    sinon.stub(connection, 'execute').resolves(updateSaleModel);

    const result = await salesModel.updateSales(1, { "productId":2 ,"quantity":5 });
  
    expect(result).to.be.deep.equal(updateSaleModel);
  });

  it('Verifica se é possível deletar uma venda através do seu ID;', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const deletedSale = await salesModel.deleteSale(1);

    expect(deletedSale).to.be.deep.equal({ id: 1 });
  });
});
