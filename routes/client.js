const express = require("express");
const { AddOrder } = require("../models/orderUser");
const { viewProducts } = require("../models/productUser");
const { UserRegister, UserLogin } = require("../models/users");
const { UcheckAuth } = require("../middleware");
const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);

//order
router.post("/add", UcheckAuth, AddOrder);

//product
router.get("/view", UcheckAuth, viewProducts);

module.exports = router;
