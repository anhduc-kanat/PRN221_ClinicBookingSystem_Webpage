
import { Helmet } from 'react-helmet-async';

import { GetPaymentHistoryPage} from 'src/sections/staff-stranc';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <GetPaymentHistoryPage/>
      
    </>
  );
}