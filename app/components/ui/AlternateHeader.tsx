import React, { useEffect, useState } from "react";

const avatars = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
];

export default function Header() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % avatars.length);
    }, 2000); // Ganti gambar setiap 2 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between py-2 p-2">
      <div>
        <h2 className="text-lg font-semibold">Hello, Vanessa</h2>
        <p className="text-sm text-gray-500">Selamat datang di Berita to TripGlide</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
        <img
          src={avatars[current]}
          alt="Avatar"
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>
    </div>
  );
}