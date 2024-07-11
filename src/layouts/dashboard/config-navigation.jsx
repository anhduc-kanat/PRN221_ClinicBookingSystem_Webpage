import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);



const navConfig = [
  {
    title: 'dashboard',
    path: '/admin',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Dentist Management',
    path: '/admin/dentist',
    icon: icon('ic_user'),
  },
  {
    title: 'Staff Management',
    path: '/admin/staff',
    icon: icon('ic_user'),
  },
  {
    title: 'Service Management',
    path: '/admin/service',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/admin/product',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/admin/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
