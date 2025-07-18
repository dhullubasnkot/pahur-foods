import React from "react";

interface SubcategoryFilterProps {
  subcategories: string[];
  selectedSubcategory: string | null;
  onSubcategorySelect: (subcategory: string | null) => void;
  categoryName: string;
}

// ✅ Orange-themed Badge
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <span
    className={`inline-block px-2 py-1 rounded border font-semibold ${className}`}
    style={{
      borderColor: "#FB923C", // Tailwind orange-400
      color: "#FB923C",
      background: "#FFF7ED", // Tailwind orange-50
    }}
  >
    {children}
  </span>
);

// ✅ Orange-themed Button
const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
    className?: string;
  }
> = ({ active, className = "", children, ...props }) => (
  <button
    className={`px-3 py-1 rounded border transition-all duration-300 ${
      active
        ? "bg-orange-500 text-white border-orange-500"
        : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SubcategoryFilter = ({
  subcategories,
  selectedSubcategory,
  onSubcategorySelect,
  categoryName,
}: SubcategoryFilterProps) => {
  if (subcategories.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
      <div className="flex items-center gap-2 mb-3">
        <Badge>{categoryName}</Badge>
        <span className="text-sm text-gray-500">subcategories:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          active={selectedSubcategory === null}
          onClick={() => onSubcategorySelect(null)}
        >
          All {categoryName}
        </Button>

        {subcategories.map((subcategory) => (
          <Button
            key={subcategory}
            active={selectedSubcategory === subcategory}
            onClick={() => onSubcategorySelect(subcategory)}
            className="capitalize"
          >
            {subcategory}
          </Button>
        ))}
      </div>
    </div>
  );
};
