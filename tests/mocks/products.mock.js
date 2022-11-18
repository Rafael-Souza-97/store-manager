const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const queryReturn = {
  id: 1, name: 'Martelo do Batman'
};


const idProduct = {
  "id": 1,
  "name": "Martelo de Thor"
};

const productNotFoundMessage = {
  "message": "Product not found"
};

module.exports = {
  allProducts,
  idProduct,
  productNotFoundMessage,
  queryReturn,
}
