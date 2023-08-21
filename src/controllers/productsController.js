const { readJSON, writeJSON } = require("../data");

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

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
    const product = products.find((product) => product.id === +req.params.id);
    return res.render("product-edit-form", {
      ...product,
      toThousand,
    });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    const { name, price, discount, description, category } = req.body;

    const productModify = products.map((product) => {
      if (product.id === +req.params.id) {
        product.name = name.trim();
        product.price = +price;
        product.discount = +discount;
        product.category = category;
        product.description = description.trim();
      }

      return product;
    });

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(products, null, 3),
      "utf-8"
    );

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
