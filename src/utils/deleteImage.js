const { unlinkSync, existsSync } = require("fs");

const deleteImage = (image) => {
  image &&
    existsSync(`./public/images/products/${image}`) &&
    unlinkSync(`./public/images/products/${image}`);
};

module.exports = deleteImage;
