const express = require("express");
const { addCart, getAllCarts, updateCart, removeCartData } = require("../controller/cartController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router.route("/cart").post(addCart);
router.route("/cart").get(isAuthenticatedUser,getAllCarts);
router.route("/cart/update/:id").put(isAuthenticatedUser, updateCart);
router.route("/removeCart/:id").delete(isAuthenticatedUser, removeCartData);















module.exports = router;
