const express = require("express");
const { viewProducts, addProduct, updateProduct, deleteProduct} =require("../models/productAdmin");
const { adminLogin, adminRegister} =require("../models/admins");
const {addOrder, viewOrders, changeStatus} =require ("../models/orderAdmin")
const { AcheckAuth } = require("../middleware");
const router = express.Router();

//product
router.get("/product/view",AcheckAuth, viewProducts);
router.post("/product/add",AcheckAuth, addProduct);
router.put("/product/update/:id",AcheckAuth, updateProduct);
router.delete("/product/delete/:id", AcheckAuth,deleteProduct);

//order
router.post("/order/add",AcheckAuth, addOrder);
router.post("/order/view",AcheckAuth, viewOrders);
router.post("/order/changeStatus", AcheckAuth,changeStatus);

//admin
router.post("/register", adminRegister);
router.post("/login", adminLogin);

module.exports = router;