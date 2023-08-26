const { readJSON, writeJSON } = require("../data");

const productsFilePath = "./productsDataBase.json";

const mainModal = {
  getCategoryProducts: (category) => {
    const products = readJSON(productsFilePath);
    return products.filter((product) => product.category === category);
  },
  filterProducts: (query) => {
    const products = readJSON(productsFilePath);
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  },
};

module.exports = mainModal;
