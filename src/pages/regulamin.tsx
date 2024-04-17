import { useEffect } from 'react';

import DefaultLayout from '@/components/layout/DefaultLayout';
import Seo from '@/components/Seo';

const RegulaminPage = () => {
  useEffect(() => {
    window.location.assign(
      'https://cez.lodz.pl/wp-content/uploads/2024/04/konkurs_codefest_2024_1.0.pdf'
    );
  });
  return (
    <DefaultLayout>
      <Seo templateTitle='Regulamin' />
      <p>Przekierowywanie...</p>
    </DefaultLayout>
  );
};

export default RegulaminPage;
