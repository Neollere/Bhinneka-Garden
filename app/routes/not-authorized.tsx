import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '~/components/ui/MainHeader';

export default function NotAuthorized() {
  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
      <MainHeader />
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Not Authorized</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
} 