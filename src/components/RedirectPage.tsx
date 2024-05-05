import { useEffect } from 'react';

import DefaultLayout from './layout/DefaultLayout';
import Seo from './Seo';

interface RedirectPageProps {
  url: string;
  title: string;
}

const RedirectPage = ({ title, url }: RedirectPageProps) => {
  useEffect(() => {
    window.location.assign(url);
  });
  return (
    <DefaultLayout>
      <Seo templateTitle={title} />
      <p>Przekierowywanie...</p>
    </DefaultLayout>
  );
};

export { RedirectPage };
