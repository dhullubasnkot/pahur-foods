import { useState, useMemo } from "react";
import { CategoryFilter } from "../components/CategoryFilter";
import { SubcategoryFilter } from "../components/SubCategoryFilter";
import ProductList from "../components/ProductsTemplate";
import ProductsData from "../data/data";

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  // Extract unique categories from dataset
  const categories = useMemo(
    () => Array.from(new Set(ProductsData.map((p) => p.category))),
    []
  );

  // Extract subcategories when category changes
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    return Array.from(
      new Set(
        ProductsData.filter((p) => p.category === selectedCategory)
          .map((p) => p.subcategory)
          .filter(Boolean) as string[]
      )
    );
  }, [selectedCategory]);

  // Filter products by category and subcategory
  const filteredProducts = useMemo(() => {
    return ProductsData.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory)
        return false;
      if (selectedSubcategory && product.subcategory !== selectedSubcategory)
        return false;
      return true;
    });
  }, [selectedCategory, selectedSubcategory]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <div className="bg-yellow-100 text-yellow-900 py-12 shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Traditional Food Products
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Discover authentic handmade ghee, pickles, jams, and vinegar crafted
            with traditional recipes and premium ingredients.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {selectedCategory && (
          <SubcategoryFilter
            subcategories={subcategories}
            selectedSubcategory={selectedSubcategory}
            onSubcategorySelect={setSelectedSubcategory}
            categoryName={selectedCategory}
          />
        )}

        {/* Product List */}
        <ProductList
          products={filteredProducts}
          category={selectedCategory ?? undefined}
          showAllByDefault={false}
        />
      </div>
    </div>
  );
};

export default AllProducts;
//