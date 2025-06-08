import { useLocation } from 'react-router-dom';

const routeTitles: { [key: string]: string } = {
  '/': 'Home Page',
  '/home': 'Home Page',
  '/news': 'News Page',
  '/profile': 'Profile Page',
  '/account': 'Account Page',
  '/settings': 'Settings Page',
  '/about': 'About Page',
  '/cart': 'Cart Page',
};

export default function PagePoint() {
  const location = useLocation();
  let title = '';

  // Find the best match for the current path
  if (routeTitles[location.pathname]) {
    title = routeTitles[location.pathname];
  } else if (location.pathname.startsWith('/news')) {
    title = 'News Page';
  } else if (location.pathname.startsWith('/profile')) {
    title = 'Profile Page';
  } else {
    title = '';
  }

  return (
    <div>
      {title}
    </div>
  );
}