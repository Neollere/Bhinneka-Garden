import type { ProvinceItem } from "app/hooks/type";

export default function Category({ Province }: { Province: ProvinceItem }) {
  return (
    <div className="max-w-[85%] bg-white rounded-3xl shadow-md overflow-hidden relative">
      <div
        className="h-60 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Province.image})` }}
      >
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/70 backdrop-blur rounded-full flex items-center justify-center">
          ♡
        </div>
        <div className="absolute bottom-16 left-4 text-white">
          <p className="text-xs">{Province.country}</p>
          <h3 className="text-lg font-bold">{Province.city}</h3>
          <p className="text-sm">
            ⭐ {Province.rating} · {Province.reviews} reviews
          </p>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full py-2 rounded-full bg-white/90 text-black text-sm font-medium">
            See more →
          </button>
        </div>
      </div>
    </div>
  );
}