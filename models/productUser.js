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

module.exports = {
  viewProducts,
};
