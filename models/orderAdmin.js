const client = require("../DataBase");

async function viewOrders(req, res) {
  const result = await client.query(`SELECT * FROM orders`);
  res.send(result.rows);
}
async function addOrder(req, res) {
  const { items, userid, address, orderdate, status } = req.body;
  const result = await client.query(
    `INSERT INTO orders (items, userid, address, orderdate, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [items, userid, address, orderdate, status]
  );
  res.send(result.rows);
}
async function changeStatus(req, res) {
  const { status } = req.body;
  const { id } = req.params;
  const result = await client.query(
    `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  res.send(result.rows);
}
module.exports = {
  viewOrders,
  addOrder,
  changeStatus,
};
