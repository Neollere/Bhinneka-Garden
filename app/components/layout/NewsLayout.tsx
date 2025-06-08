import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainHeader from "~/components/ui/MainHeader";
import { getNewsArticles } from "~/lib/services/newsService";
import type { NewsArticle } from "~/hooks/type";

const userName = "Jeniffer"; // You can replace this with dynamic user data
const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

export default function NewsLayout() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getNewsArticles();
        setArticles(data);
      } catch (err) {
        setError('Failed to load news articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
        <MainHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading news articles...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
        <MainHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
        <MainHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">No news articles found</div>
        </div>
      </div>
    );
  }

  // Get the featured article (first article in the list)
  const featured = articles[0];
  // Get the rest of the articles for the list
  const newsList = articles.slice(1);

  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
      <MainHeader />
      {/* Greeting and Date */}
      <div className="mb-2 mt-2">
        <div className="text-xs text-gray-400">{today}</div>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 mt-6 mb-6 text-gray-400 font-semibold text-base">
        <button className="text-black border-b-2 border-black pb-1">Feeds</button>
        <button className="hover:text-black">Popular</button>
        <button className="hover:text-black">Following</button>
      </div>
      {/* Featured Card */}
      <Link to={`/news/${featured.slug}`}>
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 max-w-full mx-auto border border-gray-100 relative mb-8"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Tags */}
          <div className="flex gap-2 mb-2">
            {featured.tags?.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">{tag}</span>
            ))}
          </div>
          {/* Image */}
          <div className="rounded-2xl overflow-hidden mb-4">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-36 object-cover"
            />
          </div>
          {/* Title */}
          <div className="mb-2">
            <div className="text-lg sm:text-xl font-bold text-gray-900">{featured.title}</div>
          </div>
          {/* Author */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{featured.author}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{featured.readTime}</span>
          </div>
        </motion.div>
      </Link>
      {/* Just For You Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-900">Just For You</div>
        <button className="text-blue-500 text-sm font-semibold hover:underline">See More</button>
      </div>
      <div className="space-y-4">
        {newsList.map((item) => (
          <Link key={item.id} to={`/news/${item.slug}`}>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex gap-2 items-center mb-1">
                  {item.tags?.map((tag, i) => (
                    <span key={i} className="bg-gray-200 text-gray-500 text-xs px-2 py-0.5 rounded-full font-medium">{tag}</span>
                  ))}
                  <span className="text-gray-400 text-xs">{item.date}</span>
                </div>
                <div className="font-semibold text-gray-800 text-base mb-1">{item.title}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{item.author}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}