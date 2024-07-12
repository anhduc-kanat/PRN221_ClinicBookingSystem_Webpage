import { Helmet } from 'react-helmet-async';
import {  StaffView } from 'src/sections/admin';



// ----------------------------------------------------------------------

export default function AppointmentPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <StaffView />
      

    </>
  );
}