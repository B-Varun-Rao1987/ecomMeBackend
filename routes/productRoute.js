const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
// const catchAsyncErrors=require("../middlewares/catchAsyncErrors");
// const Product=require('../models/productModel');
// const cloudinary = require("cloudinary"); 

// let product1={
//   name: "Urban Edge Hipster Sneakers",
//   description: "Urban Edge Hipster Sneakers are the perfect blend of style and comfort for those who appreciate a unique and trendy look. These sneakers feature a hipster-inspired design, with bold patterns, vibrant colors, and a touch of retro flair.\nCrafted with a focus on comfort, these sneakers are ideal for all-day wear. The cushioned insoles provide support, while the breathable materials keep your feet feeling fresh.",
//   price: 3000,
//   category: "Footwear",
//   Stock:8,
//   user:"64f1e601c3aa0ed1b19b74a8",
//   images:[
//     "https://i.ibb.co/0B3jQgW/hipster-958805-1920.jpg"
//   ]
// }

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// router
//   .route("/product/new")
//   .post(catchAsyncErrors(async (req,res,next)=>{

//     const {name,description,price,category,Stock,images,user}=product1;

//     const imagesLinks = [];
  
//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "ecommerceme",
//       });
//       const imgHandlerObj={
//         public_id: result.public_id,
//         url: result.secure_url,
//       }
//       imagesLinks.push({...imgHandlerObj});
//     }
//     let retObj={
//       name,
//       description,
//       price,
//       category,
//       Stock,
//       images:imagesLinks,
//       user
//     }
//     const product=await Product.create(retObj);
//       res.status(201).json({
//           success: true,
//           product,
//       });
//   })
//   );
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
