import { Helmet } from 'react-helmet-async';

import { ProfileView} from 'src/sections/customer/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <ProfileView/>
    </>
  );
}
