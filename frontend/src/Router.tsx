import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TestingPage } from '@/pages/Testing.page';
import { AddItemPage } from './pages/AddItem.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/testing',
    element: <TestingPage />,
  },
  {
    path: '/add-item',
    element: <AddItemPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
