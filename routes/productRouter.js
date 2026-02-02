import express from "express";
import {
  deleteProduct,
  getProducts,
  saveProduct,
  updateProduct,
  getProductById,
  searchProducts,
  newArrivalProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", saveProduct);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/search/:query", searchProducts);
productRouter.get("/:productId", getProductById);
productRouter.get("/new-arrivals", newArrivalProducts); 

export default productRouter;
