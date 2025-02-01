import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TestingPage } from '@/pages/Testing.page';
import { WelcomePage } from '@/pages/Welcome.page';
import { OnboardingPage } from '@/pages/Onboarding.page';
import { AddItemPage } from './pages/AddItem.page';
import { BorrowItemPage } from './pages/BorrowItem.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/testing',
    element: <TestingPage />,
  },
    // Hide features for now
  // {
  //   path: '/add-item',
  //   element: <AddItemPage />,
  // },
  // {
  //   path: '/borrow-item',
  //   element: <BorrowItemPage />,
  // },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
