const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

  // let user1={
  //   name:"James Dorman",
  //   email:"jamesnor888@gmail.com",
  //   password:"James@123",
  //   image:"https://i.ibb.co/NF4CG72/user1.png"

// router.route("/register").post(catchAsyncErrors(async (req,res,next)=>{

  
//   const { name, email, password,image } = user1;
//   const myCloud = await cloudinary.v2.uploader.upload(image, {
//     folder: "ecommerceme",
//   });
//   const imageHandlerObj={
//     public_id: myCloud.public_id,
//     url: myCloud.secure_url,
//   }
//   const user = await User.create({
//     name,
//     email,
//     password,
//     // avatar: {
//     //   public_id: "this is sample id",
//     //   url: "this is sample url",
//     // },
//     avatar: {...imageHandlerObj},
//   });
//   // return res.status(500).json({
//   //   success:true,
//   //   message:user
//   // });
//   sendToken(user, 201, res);
//   }
// ));
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);


router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
