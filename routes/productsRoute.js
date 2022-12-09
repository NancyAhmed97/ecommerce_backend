const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getSingleProductReviews, deleteReview, addFavorite, getFavorite } = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser,authorizeRoles('admin'),createProduct);
router.route("/products/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);
router.route("/products/:id").get(getSingleProduct);
router.route("/product/review").post(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getSingleProductReviews)
router.route("/reviews").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);
router.route("/togglefavorite/:id").get(addFavorite);
router.route("/favorite").get(getFavorite);











module.exports = router;
