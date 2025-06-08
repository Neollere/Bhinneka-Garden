import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewsArticle, updateNewsArticle, getNewsArticleBySlug } from '~/lib/services/newsService';
import type { NewsArticle } from '~/hooks/type';
import { supabase } from '~/lib/supabase';

interface NewsArticleFormProps {
  articleId?: string;
  initialData?: Partial<NewsArticle>;
}

export default function NewsArticleForm({ articleId, initialData }: NewsArticleFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    image: '',
    tags: '',
    readTime: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        summary: initialData.summary || '',
        content: initialData.content || '',
        author: initialData.author || '',
        image: initialData.image || '',
        tags: initialData.tags?.join(', ') || '',
        readTime: initialData.readTime || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const articleData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        // readTime: jika kosong, hapus property-nya (undefined)
        readTime: formData.readTime === '' ? undefined : formData.readTime,
      };
      if (articleData.readTime === undefined) {
        delete articleData.readTime;
      }

      if (articleId) {
        await updateNewsArticle(articleId, articleData);
      } else {
        await createNewsArticle(articleData);
      }

      navigate('/admin/news');
    } catch (err) {
      console.error('Failed to save article:', err);
      setError('Failed to save article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Summary *
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={3}
          value={formData.summary}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          value={formData.content}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Use bullet points (•) to separate paragraphs
        </p>
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author *
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          value={formData.author}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            // Upload to Supabase Storage (bucket: 'news-images')
            setLoading(true);
            try {
              const fileExt = file.name.split('.').pop();
              const fileName = `${Date.now()}.${fileExt}`;
              const { data, error } = await supabase.storage.from('news-images').upload(fileName, file);
              if (error) throw error;
              const { data: publicUrlData } = supabase.storage.from('news-images').getPublicUrl(fileName);
              setFormData(prev => ({ ...prev, image: publicUrlData.publicUrl }));
            } catch (err) {
              alert('Failed to upload image');
              console.error(err);
            } finally {
              setLoading(false);
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formData.image && (
          <div className="mt-2">
            <div className="relative">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="h-32 w-full object-cover rounded border"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                }}
              />
              {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                  <div className="text-white">Uploading...</div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 break-all mt-1">{formData.image}</div>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">
          Read Time
        </label>
        <input
          type="text"
          id="readTime"
          name="readTime"
          value={formData.readTime}
          onChange={handleChange}
          placeholder="e.g., 5 min read"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : articleId ? 'Update Article' : 'Create Article'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/news')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}