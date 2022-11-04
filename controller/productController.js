const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productsModel");
const ErrorHandler = require("../utils/ErrorHandler");
const Features = require("../utils/Features");

// create Product --Admin
const createProduct=async(req,res)=>{
    const product = await Product.create(req.body);

    res.status(200).json({
      success: true,
      product,
    });
  
}
// get All Products
const getAllProducts=catchAsyncErrors( async(req,res)=>{
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
const feature = new Features(Product.find(), req.query).search().filter().pagination(resultPerPage);

const products = await feature.query;

if(products){
    res.status(200).json({
        success: true,
        products,
        resultPerPage,
        productsCount,

      });
}else{
  return next(new ErrorHandler("Product is not found with this id", 404));

}
})
// Update Product ---Admin
const updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product is not found with this id", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useUnified: false,
      });
      res.status(200).json({
        success: true,
        product,
      });  
})
// delete Product
const deleteProduct =catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product is not found with this id", 404));

          }
    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product deleted succesfully",
    });
})
// single Product details
const getSingleProduct =catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
      return next(new ErrorHandler("Product is not found with this id", 404));

    }
    res.status(200).json({
      success: true,
      product,
    });
  });
  // Create New Review or Update the review
  const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
})
// Get All reviews of a single product
const getSingleProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
// Delete Review --Admin
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found with this id", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
console.log(reviews);
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;
console.log(req.query.productId);
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
module.exports={getAllProducts,createProduct,updateProduct,deleteProduct,getSingleProduct,createProductReview,getSingleProductReviews,deleteReview}