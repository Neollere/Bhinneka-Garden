import type { ProvinceData } from "../../hooks/type";

const jawaBaratProvince: ProvinceData = {
  name: "Jawa Barat",
  description: "Jawa Barat kaya akan wisata alam dan kuliner.",
  items: [
    {
      image: "/images/tangkuban-perahu.jpg",
      country: "Indonesia",
      city: "Bandung",
      rating: 4.7,
      reviews: 180,
      description: "Gunung Tangkuban Perahu yang terkenal.",
      tags: ["gunung", "wisata", "alam"]
    },
    {
      image: "/images/pangandaran.jpg",
      country: "Indonesia",
      city: "Pangandaran",
      rating: 4.6,
      reviews: 140,
      description: "Pantai Pangandaran, destinasi favorit keluarga.",
      tags: ["pantai", "wisata", "keluarga"]
    },
  ]
};

export default jawaBaratProvince;