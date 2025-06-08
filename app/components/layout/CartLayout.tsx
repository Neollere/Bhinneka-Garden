import React from 'react';
import ForumContent1 from '~/components/content/ForumContent1';
import CartContent1 from '~/components/content/CartContent1';
import MainHeader from '~/components/ui/MainHeader';


export default function ForumLayout() {
  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-4 pt-4 sm:pt-6 pb-24 relative max-w-screen-md mx-auto">
      <MainHeader />    
      <ForumContent1 />
      <CartContent1 />
    </div>
  );
}