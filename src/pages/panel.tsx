import { NextPage } from 'next';

import DefaultLayout from '@/components/layout/DefaultLayout';
import Seo from '@/components/Seo';

const LoginPage: NextPage = (): JSX.Element => {
  return (
    <DefaultLayout>
      <Seo templateTitle='Zaloguj się' />
      <div className='align-center flex justify-center pt-10'>
        <p>PANEL</p>
      </div>
    </DefaultLayout>
  );
};

export default LoginPage;
