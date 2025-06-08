import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainHeader from '~/components/ui/MainHeader';
import { getNewsArticleBySlug } from '~/lib/services/newsService';
import type { NewsArticle } from '~/hooks/type';
import Comments from '~/components/common/Comments';

export default function NewsArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      
      try {
        const data = await getNewsArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
        <MainHeader />
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
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/news" className="text-blue-500 hover:underline">
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
      <MainHeader />
      <Link to="/news" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Back to News
      </Link>
      
      <article className="mt-6">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            {article.tags?.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">{article.summary}</p>
          <div className="text-gray-700 leading-relaxed">
            {article.content.split('•').map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </article>
      {article.id && <Comments newsId={article.id} />}
    </div>
  );
} 