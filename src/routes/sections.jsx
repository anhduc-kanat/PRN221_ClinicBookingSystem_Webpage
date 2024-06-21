import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import DashboardLayoutDentist from 'src/layouts/dentist';
import ProtectedRoute from './ProtectedRoutes';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Page403 = lazy(() => import('src/pages/page-unauthorized'));
export const HomePage = lazy(() => import('src/pages/HomePage'));
export const BookingPage = lazy(() => import('src/pages/BookingPage'));
export const Login = lazy(() => import('src/pages/Login/Login'));
export const PatientDentist = lazy(() => import('src/pages/Dentist/PatientDentistPage'))
export const DentistProfile = lazy(() => import('src/pages/Dentist/DentistProfile'))


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
      path: "login",
      element: <Login />,
    },
    {
      path: "booking",
      element: (<BookingPage />)
    },
    {
      path: 'admin',
      element: (
        <DashboardLayout>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </ProtectedRoute>
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
      path: 'dentist',
      element: (
        <DashboardLayoutDentist>
          <ProtectedRoute allowedRoles={['DENTIST']}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </ProtectedRoute>
        </DashboardLayoutDentist>
      ),
      children: [
        { element: <DentistProfile />, index: true },
        { path: 'patient', element: <PatientDentist /> },
        { path: 'product', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   path: 'login',     
    //   element: <LoginPage />,
    // },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '403',
      element: <Page403 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
