"use client";

import { useState, useCallback, useMemo } from "react";
import { Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

const CATEGORIES: Category[] = [
  { id: "all", name: "All" },
  { id: "fintech", name: "Fintech" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "health", name: "Health & Wellness" },
  { id: "transportation", name: "Transportation & Mobility" },
  { id: "education", name: "Education & Learning" },
];

export function FilterSearchComponent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const categoryButtons = useMemo(
    () =>
      CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategorySelect(category.id)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap snap-start transition-all 
          ${
            selectedCategory === category.id
              ? "bg-[#474D50] text-primary-foreground font-medium"
              : "bg-[#242728] text-white font-normal"
          }`}
        >
          {category.name}
        </button>
      )),
    [selectedCategory, handleCategorySelect]
  );

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Category Filter */}
      <div className="w-full sm:w-auto overflow-x-auto hide-scrollbar flex gap-2 pb-4 scroll-smooth snap-x">
        {categoryButtons}
      </div>

      {/* Search Bar */}
      <div className="w-full sm:w-auto max-w-full sm:max-w-[300px] relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for an app"
          value={query}
          onChange={handleQueryChange}
          className="w-full h-10 pl-10 pr-4 rounded-3xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </div>
  );
}
