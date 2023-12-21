const client = require("../DataBase");

async function AddOrder(req, res) {
  const { items, userid, address, orderdate, status } = req.body;
  const result = await client.query(
    `INSERT INTO orders (items, userid, address, orderdate, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [items, userid, address, orderdate, status]
  );
  res.send(result.rows);
}

module.exports = {
  AddOrder,
};
