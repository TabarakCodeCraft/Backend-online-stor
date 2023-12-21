const client = require("../DataBase");

async function viewProducts(req, res) {
  const result = await client.query(`SELECT * FROM products`);
  res.send(result.rows);
}

module.exports = {
  viewProducts,
};
