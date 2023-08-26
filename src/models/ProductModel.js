const { readJSON, writeJSON } = require("../data");
const deleteImage = require("../utils/deleteImage");

const productsFilePath = "./productsDataBase.json";

const ProductModel = {
  getAllProducts: () => {
    return readJSON(productsFilePath);
  },

  getProductById: (productId) => {
    const products = readJSON(productsFilePath);
    return products.find((product) => product.id === productId);
  },

  addProduct: (newProduct) => {
    const products = readJSON(productsFilePath);
    newProduct.id =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;
    products.push(newProduct);
    writeJSON(products, productsFilePath);
  },

  updateProduct: (productId, updatedProductData) => {
    const products = readJSON(productsFilePath);
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        let updatedImage 
        if (updatedProductData.image !== null) {
          deleteImage(product.image);
          updatedImage = updatedProductData.image
        }else{
          updatedImage =product.image
        }
        return { ...product, ...updatedProductData, image: updatedImage };
      }
      return product;
    });
    writeJSON(updatedProducts, productsFilePath);
  },

  deleteProduct: (productId) => {
    const products = readJSON(productsFilePath);
    const filteredProducts = products.filter((product) => {
      if (product.id === productId) {
        deleteImage(product.image);
      }
      return product.id !== productId;
    });

    writeJSON(filteredProducts, productsFilePath);
  },
};

module.exports = ProductModel;
