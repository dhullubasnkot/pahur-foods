import multer from "multer";
import path from "path";
import fs from "fs";

// Custom destination function
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { category, subcategory } = req.body;

    if (!category || !subcategory) {
      return cb(new Error("Category and subcategory are required"), "");
    }

    const uploadPath = path.join(
      __dirname,
      `../uploads/${category}/${subcategory}`
    );

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

export default upload;
