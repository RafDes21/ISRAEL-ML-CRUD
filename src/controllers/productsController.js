const { readJSON, writeJSON } = require("../data");
const { unlinkSync, existsSync } = require("fs");


let products = readJSON("./productsDataBase.json");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    return res.render("products", {
      products,
      toThousand,
    });
  },

  detail: (req, res) => {
    const product = products.find((product) => product.id === +req.params.id);
    return res.render("detail", {
      ...product,
      toThousand,
    });
  },

  create: (req, res) => {
    return res.render("product-create-form");
  },

  store: (req, res) => {
    const { name, price, discount, description, category } = req.body;

    let newProduct = {
      id: products[products.length - 1].id + 1,
      name: name.trim(),
      price: +price,
      discount: +discount,
      category,
      description: description.trim(),
      image: req.file ? req.file.filename : null,
    };
    products.push(newProduct);

    writeJSON(products, "productsDataBase.json");

    return res.redirect("/products");
  },

  edit: (req, res) => {
    const product = products.find((product) => product.id === +req.params.id);
    return res.render("product-edit-form", {
      ...product,
      toThousand,
    });
  },

  update: (req, res) => {
    const { name, price, discount, description, category } = req.body;
 
    const productModify = products.map((product) => {
      if (product.id === +req.params.id) {
        req.file &&
        existsSync(`./public/images/products/${product.image}`) &&
        unlinkSync(`./public/images/products/${product.image}`);
        product.name = name.trim();
        product.price = +price;
        product.discount = +discount;
        product.category = category;
        product.description = description.trim();
        product.image = req.file ? req.file.filename : product.image;
      }

      return product;
    });

    writeJSON(productModify, "productsDataBase.json");
    return res.redirect("/products");
  },

  destroy: (req, res) => {
    const productModify = products.filter(
      (product) => product.id !== +req.params.id
    );

    writeJSON(productModify, "productsDataBase.json");
    products = productModify;
    return res.redirect("/products");
  },
};

module.exports = controller;
