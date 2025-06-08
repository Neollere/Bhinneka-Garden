import React from 'react';
import MainHeader from '~/components/ui/MainHeader';
import AdminNav from '~/components/navigation/AdminNav';
import NewsArticleForm from '~/components/admin/NewsArticleForm';
import { useAdminGuard } from '~/hooks/useAdminGuard';

export default function NewNewsArticle() {
  useAdminGuard();

  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
      <MainHeader />
      <AdminNav />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Article</h1>
      </div>
      <NewsArticleForm />
    </div>
  );
} 