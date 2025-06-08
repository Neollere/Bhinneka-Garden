import React, { useState } from 'react';
import MainHeader from '../ui/MainHeader';
import SearchBar from '../navigation/SearchBar';
import CategoryTabs from '../navigation/CategoryTabs';
import BottomNav from '../navigation/BottomNavbar';
import ProvinceCarousel from '../common/ProvinceCarousel';
import HomeBentoBox1 from '~/components/content/HomeBentoBox1';

import jawaTengahProvince from '../../data/provinceData/jawa-tengah';
import baliProvince from '../../data/provinceData/bali';
import type { ProvinceData, ProvinceItem } from '../../hooks/type';

// content
import News1 from '../content/NewsContent1';
import News2 from '../content/NewsContent2';

const ProvinceByName: Record<string, ProvinceData> = {
  "Jawa Tengah": jawaTengahProvince,
  "Bali": baliProvince,
};

const categories = [
  "Jawa Tengah", "Jawa Barat", "Jawa Timur", "DIY", "Bali",
  "Sumatera", "Kalimantan", "Sulawesi", "Nusa Tenggara", "Maluku", "Papua",
  ""
];

// Gabungkan semua items dari seluruh provinsi untuk global search
const allItems: (ProvinceItem & { province: string })[] = Object.entries(ProvinceByName)
  .flatMap(([province, data]) =>
    (data.items || []).map(item => ({ ...item, province }))
  );

export default function HomeLayout() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeProvince, setActiveProvince] = useState("Jawa Tengah");
  const [suggestions, setSuggestions] = useState<(ProvinceItem & { province: string })[]>([]);

  const Province = ProvinceByName[activeProvince];
  const items = Province?.items || [];

  const availableTags = Array.from(
    new Set(items.flatMap(item => item.tags || []))
  );

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredItems = items.filter(item =>
    (item.city.toLowerCase().includes(query.toLowerCase()) ||
      item.country.toLowerCase().includes(query.toLowerCase())) &&
    (selectedTags.length === 0 ||
      selectedTags.every(tag => item.tags?.includes(tag)))
  );

  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
      <MainHeader />

      <SearchBar
        query={query}
        setQuery={setQuery}
        tags={availableTags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        allItems={allItems}
        setSuggestions={setSuggestions}
        onSuggestionSelect={(province, city) => {
          setActiveProvince(province);
          setQuery(city);
        }}
        suggestions={suggestions}
      />
      <CategoryTabs
        query={query}
        categories={categories}
        activeProvince={activeProvince}
        onSelectProvince={setActiveProvince}
      />

      {/* Province Description */}
      <div className="mt-2 mb-2 p-3 sm:p-4 bg-gray-50 rounded-xl">
        <h2 className="text-lg sm:text-xl font-bold mb-2">{Province?.name}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{Province?.description}</p>
      </div>

      {/* Province Items Carousel */}
      {filteredItems.length > 0 ? (
        <ProvinceCarousel items={filteredItems} />
      ) : (
        <div className="text-center text-gray-400 py-10 text-sm sm:text-base">
          Tidak ada hasil ditemukan untuk "{query}"
          {selectedTags.length > 0 && (
            <span className="block mt-1">
              dengan tag: {selectedTags.join(", ")}
            </span>
          )}
        </div>
      )}

      <HomeBentoBox1 />
      <News1 />
      <News2 />

    </div>
  );
}