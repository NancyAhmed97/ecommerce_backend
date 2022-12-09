const Cart = require("../models/Cart");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Products = require("../models/productsModel");


// // Create cart
const addCart = catchAsyncErrors(async (req, res, next) => {

  let {
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
    Stock,
  } = req.body;
  const cartItem = await Cart.find({ productId })
  let cartEdired = []
  console.log(cartItem);
  if (cartItem.length!=0) {
    quantity = quantity + cartItem[0].quantity
    cartEdired = await Cart.findByIdAndUpdate(cartItem[0]._id, {quantity },{
      new: true,
      runValidators: true,
      useUnified: false,
    });
  }else{
    console.log("hiiii");
      cartEdired = await Cart.create({
    productName,
    quantity:req.body.quantity,
    productImage,
    productPrice,
    userId,
    productId,
    Stock,
  });
  }

  await cartEdired.save()
  res.status(200).json({
    success: true,
    cartEdired,
  });
});

// // Get all carts
const getAllCarts = catchAsyncErrors(async (req, res, next) => {
  const cartData = await Cart.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    cartData
  });
});
// // updateCart
const updateCart = catchAsyncErrors(async (req, res, next) => {
  const {
    quantity,
  } = req.body;
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new ErrorHandler("No cart found with this id", 404));
  }

  cartEdired = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    quantity
  });
  res.status(200).json({
    success: true,
    cart: cartEdired,
  });
});
// // removeCartData
const removeCartData = catchAsyncErrors(async (req, res, next) => {
  const cartData = await Cart.findById(req.params.id);
  if (!cartData) {
    return next(new ErrorHandler("Items is not found with this id", 404));
  }
  await cartData.remove();

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
  });
});



module.exports = {
  addCart,
  getAllCarts,
  updateCart,
  removeCartData
  // createOrder,
  // getSingleOrder,
  // getAllOrders,
  // getAdminAllOrders,
  // deleteOrder,
  // updateAdminOrder
}