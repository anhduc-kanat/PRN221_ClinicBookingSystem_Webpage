import { Helmet } from 'react-helmet-async';

import { AccountView } from 'src/sections/customer/view';


// ----------------------------------------------------------------------

export default function AppointmentPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <AccountView />
      

    </>
  );
}