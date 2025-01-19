import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TestingPage } from '@/pages/Testing.page';
import { AddItemPage } from './pages/AddItem.page';
import { BorrowItemPage } from './pages/BorrowItem.page';

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
  {
    path: '/borrow-item',
    element: <BorrowItemPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
