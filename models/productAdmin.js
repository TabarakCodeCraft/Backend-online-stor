const client = require("../DataBase");

async function viewProducts(req, res) {
  try {
    let { search, limit } = req.query;
    let query = "SELECT * FROM products";

    if (search) {
      query += " WHERE name ILIKE $1";
      search = `%${search}%`;
    }

    if (limit) {
      query += " LIMIT $2";
    }

    const result = await client.query(
      query,
      limit ? [search, limit] : [search]
    );

    if (result.rows.length === 0) {
      res.status(404).send("No products found.");
    } else {
      res.send(result.rows);
    }
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send("Internal Server Error");
  }
}
async function addProduct(req, res) {
  const { name, price, discount, image, active } = req.body;
  const result = await client.query(
    `INSERT INTO products (name, price, discount, image,active) VALUES ($1, $2, $3, $4,$5) RETURNING *`,
    [name, price, discount, image, active]
  );
  res.send(result.rows);
}
async function updateProduct(req, res) {
  const { name, price, discount, image, active } = req.body;
  const { id } = req.params;
  const result = await client.query(
    `UPDATE products SET name = $1, price = $2, discount = $3, image = $4, active = $5 WHERE id = $6 RETURNING *`,
    [name, price, discount, image, active, id]
  );
  res.send(result.rows);
}
async function deleteProduct(req, res) {
  const { id } = req.params;
  client.query(`DELETE FROM products WHERE id = $1`, [id]);
  res.send("success");
}

module.exports = {
viewProducts,
addProduct,
updateProduct,
deleteProduct
};
