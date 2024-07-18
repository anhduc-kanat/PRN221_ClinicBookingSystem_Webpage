import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Appointment',
    path: '/staff/appointment',
    icon: icon('ic_user'),
  },
  {
    title: 'Profile',
    path: '/staff/profile',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
  {
    title: 'Transaction',
    path: '/staff/transaction',
    icon: icon('ic_money'),
  }
];

export default navConfig;
