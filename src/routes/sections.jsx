import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import StaffLayout from 'src/layouts/staff';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const HomePage = lazy(() => import('src/pages/HomePage'));
export const BookingPage = lazy(() => import('src/pages/BookingPage'))
export const AppointmentPage = lazy(() => import('src/pages/appointment'))
export const DentistPage = lazy(() => import('src/pages/DentistManagement'))
export const CustomerPage = lazy(() => import('src/pages/CustomerManagement'))
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
      path: 'staff',
      element: (
        <StaffLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </StaffLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'appointment', element: <AppointmentPage /> },
        { path: 'dentist', element: <DentistPage/> },
        { path: 'customer', element: <CustomerPage /> },
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
