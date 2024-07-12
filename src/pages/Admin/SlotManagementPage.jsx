import { Helmet } from 'react-helmet-async';
import { SlotManagementView } from 'src/sections/admin';




// ----------------------------------------------------------------------

export default function SlotManagementPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <SlotManagementView />
    </>
  );
}