import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/staff/appointment',
    icon: icon('ic_analytics'),
  },
  {
    title: 'appointment',
    path: '/staff/appointment',
    icon: icon('ic_user'),
  },
  {
    title: 'customer',
    path: '/staff/customer',
    icon: icon('ic_cart'),
  },
  {
    title: 'dentist',
    path: '/staff/dentist',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
