import { Helmet } from 'react-helmet-async';
import { ServiceManagementView } from 'src/sections/admin';




// ----------------------------------------------------------------------

export default function ServiceManagementPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <ServiceManagementView />
      

    </>
  );
}