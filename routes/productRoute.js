import express from "express";
import { isAdmin, requireSignIn } from "../middlewears/authMiddleware.js";
import {
  braintreePamentsController,
  braintreeTokenController,
  categoryProductController,
  createProductController,
  deleteProductController,
  getPhotoController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get product
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:id", getSingleProductController);

//delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//update product:
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get photo
router.get("/product-photo/:pid", getPhotoController);

//filter product:
router.post("/product-filters", productFilterController);

//product count:
router.get("/product-count", productCountController);

//product per page:
router.get("/product-list/:page", productListController);

//search product
router.get("/product-search/:keyword", searchProductController);

//similar product:
router.get("/related-product/:pid/:cid", relatedProductController);
//category products product:
router.get("/category-product/:slug", categoryProductController);

//payments routes
//token:
router.get("/braintree/token", braintreeTokenController);

//payment:
router.post("/braintree/payment", requireSignIn, braintreePamentsController);
export default router;
