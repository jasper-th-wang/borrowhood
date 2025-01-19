import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { ListingPage } from './pages/Listing.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/item/create',
    element: <ListingPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
