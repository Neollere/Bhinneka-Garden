import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainHeader from '~/components/ui/MainHeader';
import AdminNav from '~/components/navigation/AdminNav';
import NewsArticleForm from '~/components/admin/NewsArticleForm';
import { getNewsArticleById } from '~/lib/services/newsService';
import type { NewsArticle } from '~/hooks/type';
import { useAdminGuard } from '~/hooks/useAdminGuard';

export default function EditNewsArticle() {
  useAdminGuard();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!id) return;
      
      try {
        const data = await getNewsArticleById(id);
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
        <MainHeader />
        <AdminNav />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
        <MainHeader />
        <AdminNav />
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Article not found'}</p>
          <button
            onClick={() => navigate('/admin/news')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
      <MainHeader />
      <AdminNav />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
      </div>
      <NewsArticleForm articleId={id} initialData={article} />
    </div>
  );
} 