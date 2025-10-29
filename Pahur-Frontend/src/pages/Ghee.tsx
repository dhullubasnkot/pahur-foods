import ProductList from "../components/ProductsTemplate";
import ProductsData from "../data/data";

const gheeProducts = ProductsData.filter(
  (product) => product.category === "Ghee"
);

export default function GheePage() {
  return <ProductList category="Ghee" products={gheeProducts} />;
}
//