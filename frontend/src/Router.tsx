import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TestingPage } from '@/pages/Testing.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/testing',
    element: <TestingPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
