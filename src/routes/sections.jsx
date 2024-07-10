import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import CustomerLayout from 'src/layouts/customer';
import DashboardLayout from 'src/layouts/dashboard';
import DashboardLayoutDentist from 'src/layouts/dentist';
import ProtectedRoute from './ProtectedRoutes';
// import AboutPage from 'src/pages/AboutPage.jsx';
// import ServiceTeethPage from 'src/pages/ServiceTeethPage.jsx';
// import PriceList from 'src/pages/PriceList.jsx';

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
export const PatientDentist = lazy(() => import('src/pages/Dentist/PatientDentistPage'));
export const DentistProfile = lazy(() => import('src/pages/Dentist/DentistProfile'));

export const AppointmentCustomerPage = lazy(() => import('src/pages/Customer/AppointmentPage'));
export const ProfileCustomerPage = lazy(() => import('src/pages/Customer/ProfilePage'));
export const AccountCustomerPage = lazy(() => import('src/pages/Customer/AccountPage'));
export const PaymentHistoryPage = lazy(() => import('src/pages/Customer/PaymentHistoryPage'));

export const PriceList = lazy(() => import('src/pages/PriceList'));
export const ServiceTeethPage = lazy(() => import('src/pages/ServiceTeethPage'));
export const AboutPage = lazy(() => import('src/pages/AboutPage'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '',
      element: <HomePage />,
      // children: [
      //   { path: 'booking', element: <BookingPage />}
      // ]
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'booking',
      element: <BookingPage />,
    },
    {
      path: 'service',
      element: <ServiceTeethPage />,
    },
    {
      path: 'about',
      element: <AboutPage />,
    },
    {
      path: 'price',
      element: <PriceList />,
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
    {
      path: 'customer',
      element: (
        <CustomerLayout>
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <Suspense>
              <Outlet />
            </Suspense>
          </ProtectedRoute>
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
