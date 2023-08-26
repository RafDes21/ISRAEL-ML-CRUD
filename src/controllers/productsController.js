const ProductModel = require("../models/productModel");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    const products = ProductModel.getAllProducts();
    return res.render("products", {
      products,
      toThousand
    });
  },

  detail: (req, res) => {
    const productId = +req.params.id;
    const product = ProductModel.getProductById(productId);
    return res.render("detail", {
      ...product,
      toThousand
    });
  },

  create: (req, res) => {
    return res.render("product-create-form");
  },

  store: (req, res) => {
    const { name, price, discount, description, category } = req.body;
    const newProduct = {
      name: name.trim(),
      price: +price,
      discount: +discount,
      category,
      description: description.trim(),
      image: req.file ? req.file.filename : null,
    };
    ProductModel.addProduct(newProduct);

    return res.redirect("/products");
  },

  edit: (req, res) => {
    const productId = +req.params.id;
    const product = ProductModel.getProductById(productId);
    return res.render("product-edit-form", {
      ...product,
      toThousand
    });
  },

  update: (req, res) => {
    const productId = +req.params.id;
    const { name, price, discount, description, category } = req.body;
    const updatedProductData = {
      name: name.trim(),
      price: +price,
      discount: +discount,
      category,
      description: description.trim(),
      image: req.file ? req.file.filename : null,
    };
    ProductModel.updateProduct(productId, updatedProductData);

    return res.redirect("/products");
  },

  destroy: (req, res) => {
    const productId = +req.params.id;
    ProductModel.deleteProduct(productId);

    return res.redirect("/products");
  },
};

module.exports = controller;
