import { Helmet } from 'react-helmet-async';

import { ProfileView} from 'src/sections/customer/view';


// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <ProfileView />
      

    </>
  );
}