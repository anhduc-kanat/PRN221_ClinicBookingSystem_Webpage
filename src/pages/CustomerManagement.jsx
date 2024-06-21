
import { Helmet } from 'react-helmet-async';
import { CustomerView } from 'src/sections/manageCustomer/view';

export default function CustomerPage() {
    return (
      <>
        <Helmet>
          <title> Customer | Minimal UI </title>
        </Helmet>
        <CustomerView />
      </>
    );
  }