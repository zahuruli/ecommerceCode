import express from "express";
import {
  adminOrdersController,
  forgotPasswordController,
  getAllUsersController,
  loginController,
  orderStatusController,
  registerController,
  updateProfileController,
  userOrdersController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewears/authMiddleware.js";

//router object

const router = express.Router();

//Routing
// Register || method post
router.post("/register", registerController);

//login || post
router.post("/login", loginController);

//Forgot Password:
router.post("/forgot-password", forgotPasswordController);

//get all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile:
router.put("/profile", requireSignIn, updateProfileController);

//user order:
router.get("/user-orders", requireSignIn, userOrdersController);
//admin order:
router.get("/admin-orders", requireSignIn, isAdmin, adminOrdersController);

//order Status Update:
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
