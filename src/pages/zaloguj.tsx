import { NextPage } from 'next';

import DefaultLayout from '@/components/layout/DefaultLayout';
import LoginForm from '@/components/login_form';
import Seo from '@/components/Seo';

const LoginPage: NextPage = (): JSX.Element => {
  return (
    <DefaultLayout>
      <Seo templateTitle='Zaloguj się' />
      <div className='align-center flex justify-center'>
        <LoginForm />
      </div>
    </DefaultLayout>
  );
};

export default LoginPage;
