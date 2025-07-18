interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onCategorySelect(null)}
        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
          selectedCategory === null
            ? "bg-orange-600 text-white border-orange-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
        All Products
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`px-4 py-2 rounded-full border text-sm font-medium capitalize transition-all duration-300 ${
            selectedCategory === category
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
