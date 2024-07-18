import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Working Page',
    path: '/dentist',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Profile',
    path: '/dentist/profile',
    icon: icon('ic_user'),
  },
];

export default navConfig;
