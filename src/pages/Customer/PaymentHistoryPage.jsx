import { Helmet } from 'react-helmet-async';

import { TransactionView} from 'src/sections/customer/view';


// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <TransactionView/>
      

    </>
  );
}