import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TestingPage } from '@/pages/Testing.page';
import { WelcomePage } from '@/pages/Welcome.page';
import { OnboardingPage } from '@/pages/Onboarding.page';

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
]);

export function Router() {
  return <RouterProvider router={router} />;
}
