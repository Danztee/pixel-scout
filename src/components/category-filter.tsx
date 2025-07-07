"use client";

import { useState, useCallback, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

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
    <div className="flex flex-wrap justify-between gap-4">
      {/* Category Filter */}
      <div className="w-full sm:w-auto overflow-x-auto hide-scrollbar flex gap-2 pb-4 scroll-smooth snap-x">
        {categoryButtons}
      </div>

      <Input
        type="text"
        placeholder="Search for an app"
        icon={<Search size={20} />}
        className="w-[300px] border border-[#525252] bg-[#262626] rounded-[12px] text-white"
      />
    </div>
  );
}
