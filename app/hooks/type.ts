export interface CarouselSection {
  title: string;
  items: ProvinceItem[];
}

export interface ProvinceItem {
  image: string;  // bukan 'img'
  country: string;
  city: string;
  rating: number;
  reviews: number;
  description?: string;
  tags?: string[];
}

export interface ProvinceData {
  name: string;
  description: string;
  items: ProvinceItem[];
  image?: string; // tambahkan ini jika memang ingin ada gambar
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string;
  tags?: string[];
  author: string;
  date: string;
  readTime?: string;
}