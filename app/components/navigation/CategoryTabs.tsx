import React from "react";

interface CategoryTabsProps {
  query: string;
  categories: string[];
  activeProvince: string;
  onSelectProvince: (province: string) => void;
}

export default function CategoryTabs({
  query,
  categories,
  activeProvince,
  onSelectProvince,
}: CategoryTabsProps) {
  // Highlight dengan warna utama (hitam-putih)
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="bg-black text-white rounded">{part}</span>
      ) : (
        part
      )
    );
  };

return (
  <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar pb-1 scroll-smooth">
    {query
      ? (
        <button
          key={activeProvince}
          className="px-6 py-1 rounded-full text-sm font-semibold bg-black text-white shadow-md"
        >
          {highlightText(activeProvince, query)}
        </button>
      )
      : categories.map((province) => (
        <button
          key={province}
          onClick={() => onSelectProvince(province)}
          className={`px-6 py-1 rounded-full text-sm font-semibold transition-colors duration-200
            ${activeProvince === province
              ? "bg-black text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          `}
        >
          {highlightText(province, query)}
        </button>
      ))
    }
  </div>
);
}