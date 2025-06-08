import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import type { ProvinceItem } from "app/hooks/type";

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  tags?: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  allItems: (ProvinceItem & { province: string })[];
  suggestions: (ProvinceItem & { province: string })[];
  setSuggestions: (items: (ProvinceItem & { province: string })[]) => void;
  onSuggestionSelect: (province: string, city: string) => void;
}

export default function SearchBar({
  query,
  setQuery,
  tags = [],
  selectedTags,
  onTagSelect,
  allItems,
  suggestions,
  setSuggestions,
  onSuggestionSelect,
}: SearchBarProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const lower = query.toLowerCase();
      const filtered = allItems.filter(
        item =>
          item.city.toLowerCase().includes(lower) ||
          item.country.toLowerCase().includes(lower) ||
          item.province.toLowerCase().includes(lower)
      );
      setSuggestions(filtered.slice(0, 6));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [query, allItems, setSuggestions]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (province: string, city: string) => {
    onSuggestionSelect(province, city);
    setShowDropdown(false);
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mt-6">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={handleInput}
            placeholder="Cari kota, negara, atau provinsi"
            className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm"
            onFocus={() => query && setShowDropdown(true)}
            autoComplete="off"
          />
          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-60 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <div
                  key={item.city + item.province + idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-col"
                  onClick={() => handleSuggestionClick(item.province, item.city)}
                >
                  <span className="font-semibold">{item.city}</span>
                  <span className="text-xs text-gray-500">{item.province} • {item.country}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className={`p-2 rounded-full border ${
            showFilter ? 'bg-black text-white' : 'border-gray-300'
          }`}
          onClick={handleFilter}
          aria-label="Filter"
        >
          <FaFilter />
        </button>
      </div>

      {/* Filter Dropdown */}
      {showFilter && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
          <div className="p-3">
            <h3 className="text-sm font-semibold mb-2">Filter by Tags</h3>
            <div className="space-y-2">
              {tags.map((tag) => (
                <label key={tag} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => onTagSelect(tag)}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}