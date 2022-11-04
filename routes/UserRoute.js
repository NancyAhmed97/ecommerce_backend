const express = require("express");
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword, userDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, deleteUser, updateUserRole } = require("../controller/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();



router.route("/registration").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,userDetails);
router.route("/me/changepassword").put(isAuthenticatedUser, updatePassword);
router.route("/me/changeprofile").put(isAuthenticatedUser, updateProfile);
router.route("/me/changeprofile").put(isAuthenticatedUser, getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)







module.exports = router;
