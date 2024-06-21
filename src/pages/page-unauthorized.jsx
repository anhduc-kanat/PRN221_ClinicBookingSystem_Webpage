import { Helmet } from 'react-helmet-async';

import UnauthorizedView from 'src/sections/error/unauthorized-view';

// ----------------------------------------------------------------------

export default function UnauthorizedPage() {
  return (
    <>
      <Helmet>
        <title> 403 Unauthorized </title>
      </Helmet>

      <UnauthorizedView />
    </>
  );
}
