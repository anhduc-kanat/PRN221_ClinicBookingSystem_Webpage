import { Helmet } from 'react-helmet-async';
import { DentistView } from 'src/sections/manageDentist/view';

export default function DentistPage() {
    return (
      <>
        <Helmet>
          <title> Dentist | Minimal UI </title>
        </Helmet>
        <DentistView />
      </>
    );
  }