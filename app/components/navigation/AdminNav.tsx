import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaNewspaper } from 'react-icons/fa';

export default function AdminNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="bg-white shadow-sm mb-4">
      <div className="max-w-screen-md mx-auto px-4">
        <div className="flex items-center space-x-4 py-2">
          <Link
            to="/admin/news"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive('/admin/news')
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaNewspaper className="text-lg" />
            <span>News Management</span>
          </Link>
        </div>
      </div>
    </div>
  );
}