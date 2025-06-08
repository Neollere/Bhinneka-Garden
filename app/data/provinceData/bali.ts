import type { ProvinceData } from "../../hooks/type";

const baliProvince: ProvinceData = {
  name: "Bali",
  description: "Bali.",
  items: [
    {
      image: "/images/karang-bolong.jpg",
      country: "Indonesia",
      city: "Cilacap",
      rating: 4.7,
      reviews: 92,
      description: "Pantai Karang Bolong yang indah di Cilacap.",
      tags: ["pantai", "alam", "sunset"]
    },
    {
      image: "/images/menganti.jpg",
      country: "Indonesia",
      city: "Kebumen",
      rating: 4.8,
      reviews: 120,
      description: "Pantai Menganti dengan pasir putih dan tebing hijau.",
      tags: ["pantai", "tebing", "wisata"]
    },
  ]
};

export default baliProvince;