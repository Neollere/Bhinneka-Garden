import React from "react";

type BentoItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const items: BentoItem[] = [
  {
    title: "Forum",
    description: "Diskusi & Tanya Jawab",
    icon: <span role="img" aria-label="Forum">💬</span>,
    onClick: () => window.location.href = "/forum",
  },
  {
    title: "Berita",
    description: "Update terbaru",
    icon: <span role="img" aria-label="Berita">📰</span>,
    onClick: () => window.location.href = "/news",
  },
  {
    title: "Peta",
    description: "Lihat lokasi",
    icon: <span role="img" aria-label="Peta">🗺️</span>,
    onClick: () => alert("Fitur segera hadir!"),
  },
  {
    title: "Akun",
    description: "Profil kamu",
    icon: <span role="img" aria-label="Akun">👤</span>,
    onClick: () => window.location.href = "/account",
  },
];

export default function HomeBentoBox1() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-10">
      {items.map((item, i) => (
        <button
          key={i}
          className="group relative rounded-2xl bg-white/60 backdrop-blur-md shadow-xl border border-white/40 p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/80 focus:outline-none"
          onClick={item.onClick}
          type="button"
        >
          {/* Gradient Glow */}
          <span className="absolute inset-0 z-0 rounded-2xl pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-300"
            style={{
              background: "radial-gradient(circle at 70% 30%, #60a5fa55 0%, transparent 70%)"
            }}
          />
          {/* Icon */}
          <div className="relative z-10 mb-3 text-4xl group-hover:scale-110 transition-transform duration-200 drop-shadow">{item.icon}</div>
          {/* Title */}
          <div className="relative z-10 font-bold text-base mb-1 text-center text-blue-900 group-hover:text-blue-700 drop-shadow">{item.title}</div>
          {/* Description */}
          <div className="relative z-10 text-gray-600 text-xs text-center">{item.description}</div>
        </button>
      ))}
    </div>
  );
}