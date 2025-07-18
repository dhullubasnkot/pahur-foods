import { useState, useMemo } from "react";
import { ProductCard } from "../components/ProductsCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { SubcategoryFilter } from "../components/SubCategoryFilter";
import ProductsData from "../data/data";

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  const categories = useMemo(
    () => Array.from(new Set(ProductsData.map((p) => p.category))),
    []
  );

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

      {/* Filters & Products */}
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

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-sm text-gray-500">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 && "s"}
          </span>
          {selectedCategory && (
            <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs">
              Category: {selectedCategory}
            </span>
          )}
          {selectedSubcategory && (
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs">
              Subcategory: {selectedSubcategory}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🫙</div>
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-gray-500">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
