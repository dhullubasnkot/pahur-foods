import ProductList from "../components/ProductsTemplate";
import ProductsData from "../data/data";

const pickles = ProductsData.filter(
  (product) => product.category === "Pickles"
);

export default function PickelPage() {
  return <ProductList category="Pickles" products={pickles} />;
}
//