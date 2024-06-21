import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import CustomerLayout from 'src/layouts/customer';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const HomePage = lazy(() => import('src/pages/HomePage'));
export const BookingPage = lazy(() => import('src/pages/BookingPage'));

export const AppointmentCustomerPage = lazy(() => import('src/pages/Customer/AppointmentPage'))
export const ProfileCustomerPage = lazy(() => import('src/pages/Customer/ProfilePage'))
export const AccountCustomerPage = lazy(() => import('src/pages/Customer/AccountPage'))
export const PaymentHistoryPage = lazy(() => import('src/pages/Customer/PaymentHistoryPage'))


// ----------------------------------------------------------------------



export default function Router() {
  const routes = useRoutes([
    {
      path: "",
      element: (<HomePage />),
      // children: [
      //   { path: 'booking', element: <BookingPage />}
      // ]
    },
    {
      path: "booking",
      element: (<BookingPage />)
    },
    {
      path: 'admin',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'product', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'customer',
      element: (
        <CustomerLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </CustomerLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'appointment', element: <AppointmentCustomerPage /> },
        { path: 'profile', element: <ProfileCustomerPage /> },
        { path: 'account', element: <AccountCustomerPage /> },
        { path: 'payment-history', element: <PaymentHistoryPage /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
