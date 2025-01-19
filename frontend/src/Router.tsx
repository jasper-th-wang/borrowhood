import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TestingPage } from '@/pages/Testing.page';
import { Welcome } from './components/Welcome/Welcome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/testing',
    element: <TestingPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
