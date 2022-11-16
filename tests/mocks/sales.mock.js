const tableSales = [
  { id: 1, date: '2022-11-11 21:00:58' },
  { id: 1, date: '2022-11-12 19:13:50' },
];

const tableSalesProducts = [
  [
    {
      "sale_id": 1,
      "product_id": 1,
      "quantity": 5,
    },
    {
      "sale_id": 1,
      "product_id": 2,
      "quantity": 10,
    },
    {
      "sale_id": 2,
      "product_id": 3,
      "quantity": 15,
    },
  ]
];

const insertServiceSale = {
  "id": 4,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ]
};

const saleInsert = [
  {
    "productId": 1,
    "quantity": 2
  },
  {
    "productId": 3,
    "quantity": 1
  }
];

const saleControllerInsert = [
  {
    "productId": 1,
    "quantity": 2
  }
];

const saleInsertModel = {
    "productId": 1,
    "quantity": 1
 }

const saleInsertModelReturn = {
      "saleId": 4,
      "productId": 1,
      "quantity": 1
};

const ProductNotFoundMessage = {
  "message": "Product not found"
};

const invalidSale = [
  {
    "productId": 100,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 1
  }
];

module.exports = {
  tableSales,
  tableSalesProducts,
  insertServiceSale,
  saleInsert,
  saleInsertModelReturn,
  ProductNotFoundMessage,
  invalidSale,
  saleInsertModel,
  saleControllerInsert,
}