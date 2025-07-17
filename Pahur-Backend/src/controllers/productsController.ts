import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, Price, category, subcategory, description, Ingredients } =
      req.body;

    // multer sets req.files as an object when using upload.fields()
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    if (!files) {
      return res
        .status(400)
        .json({ message: "At least one image file is required." });
    }

    const mainImageFiles = files["mainImage"] || [];
    const galleryFiles = files["gallery"] || [];

    if (mainImageFiles.length === 0) {
      return res.status(400).json({ message: "Main image is required." });
    }

    // Assuming multer saves files to /uploads/category/subcategory/
    const imageFolder = `/uploads/${category}/${subcategory}/`;

    // Path for main image (first file in mainImage)
    const main = imageFolder + mainImageFiles[0].filename;

    // Paths for gallery images
    const images = galleryFiles.map((file) => imageFolder + file.filename);

    const product = await prisma.product.create({
      data: {
        name,
        Price: parseInt(Price),
        category,
        subcategory,
        description,
        Ingredients,
        image: { main, images },
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({
      message: "Error creating product",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, Price, description, Ingredients, category, subcategory } =
    req.body;
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        Price: parseInt(Price),
        description,
        Ingredients,
        category,
        subcategory,
      },
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await prisma.product.delete({ where: { id } });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err });
  }
};
