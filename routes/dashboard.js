const express = require("express");
const { viewProducts, addProduct, updateProduct, deleteProduct} =require("../models/productAdmin");
const { adminLogin, adminRegister} =require("../models/admins");
const {addOrder, viewOrders, changeStatus} =require ("../models/orderAdmin")
const { AcheckAuth } = require("../middleware");
const router = express.Router();

router.get("/product/view", AcheckAuth, viewProducts);
router.post("/product/add", AcheckAuth, addProduct);
router.put("/product/update/:id",AcheckAuth, updateProduct);
router.delete("/delete/:id", AcheckAuth,deleteProduct);

router.post("/order/add",AcheckAuth, addOrder);
router.post("/order/view",AcheckAuth, viewOrders);
router.post("/changeStatus", AcheckAuth,changeStatus);


router.post("/register", adminRegister);
router.post("/login", adminLogin);

module.exports = router;