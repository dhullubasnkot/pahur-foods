import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController";
import upload from "../middleware/multer";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  createProduct
);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
