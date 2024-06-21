import { Helmet } from 'react-helmet-async';

import { AppointmentView } from 'src/sections/customer/view';


// ----------------------------------------------------------------------

export default function AppointmentPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <AppointmentView />
      

    </>
  );
}