import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '~/components/ui/MainHeader';
import AdminNav from '~/components/navigation/AdminNav';
import { getNewsArticles, deleteNewsArticle } from '~/lib/services/newsService';
import type { NewsArticle } from '~/hooks/type';
import { useAdminGuard } from '~/hooks/useAdminGuard';

export default function NewsAdmin() {
  useAdminGuard();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      setLoading(true);
      const data = await getNewsArticles();
      setArticles(data);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await deleteNewsArticle(id);
      setArticles(articles.filter(article => article.id.toString() !== id));
    } catch (err) {
      console.error('Error deleting article:', err);
      alert('Failed to delete article');
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
        <MainHeader />
        <AdminNav />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading articles...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
        <MainHeader />
        <AdminNav />
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchArticles}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
      <MainHeader />
      <AdminNav />
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">News Articles</h1>
        <Link
          to="/admin/news/new"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Add New Article
        </Link>
      </div>
      <div className="space-y-4">
        {articles.map(article => (
          <div
            key={article.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-2">{article.summary}</p>
                <div className="text-sm text-gray-500">
                  <span>By {article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.date}</span>
                  {article.readTime && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{article.readTime} read</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/admin/news/edit/${article.id}`}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(article.id.toString())}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
} 