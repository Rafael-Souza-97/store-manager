const tableSales = [
  { id: 1, date: '2022-11-11 21:00:58' },
  { id: 1, date: '2022-11-12 19:13:50' },
];

const tableSalesProducts = [
  [
    {
      "saleId": 1,
      "productId": 1,
      "quantity": 5,
    },
    {
      "saleId": 1,
      "productId": 2,
      "quantity": 10,
    },
    {
      "saleId": 2,
      "productId": 3,
      "quantity": 15,
    },
  ]
];

const salesProductsService = [
  {
    "date": "2022-11-15T17:41:51.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-11-15T17:41:51.000Z",
    "productId": 2,
    "quantity": 10
  }
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

const salesById = [
  {
    "date": "2022-11-12T23:16:29.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-11-12T23:16:29.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const productNotFoundMessage = {
  "message": "Product not found"
};

const saleNotFoundMessage = {
  "message": "Sale not found"
};

module.exports = {
  tableSales,
  tableSalesProducts,
  insertServiceSale,
  saleInsert,
  saleInsertModelReturn,
  invalidSale,
  saleInsertModel,
  saleControllerInsert,
  salesById,
  salesProductsService,
  productNotFoundMessage,
  saleNotFoundMessage,
}