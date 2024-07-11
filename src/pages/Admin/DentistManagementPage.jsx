import { Helmet } from 'react-helmet-async';
import { DentistView } from 'src/sections/admin';



// ----------------------------------------------------------------------

export default function AppointmentPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <DentistView />
      

    </>
  );
}