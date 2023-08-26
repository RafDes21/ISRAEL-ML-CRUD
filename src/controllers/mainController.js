const mainModal = require("../models/MainModal");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    // Do the magic
    return res.render("index", {
      productsVisited: mainModal.getCategoryProducts("visited"),
      productsInSale: mainModal.getCategoryProducts("in-sale"),
      toThousand,
    });
  },
  search: (req, res) => {
    // Do the magic
    const query = req.query.keywords;
    const message = query === "" ? "Debe usar alguna palabra clave..." : "";
    const results = mainModal.filterProducts(query);

    return res.render("results", {
      results,
      toThousand,
      keywords: query,
      message,
    });
  },
};

module.exports = controller;
