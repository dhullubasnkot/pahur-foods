import express from "express";
import path from "path";
import productsroutes from "./routes/productsroutes";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/products", productsroutes);

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
