import LoginForm from '@/components/login_form';
import Seo from '@/components/Seo';
import { NextPage } from 'next';
import DefaultLayout from '@/components/layout/DefaultLayout';

const LoginPage: NextPage = (): JSX.Element => {
  return (
    <DefaultLayout>
      <Seo templateTitle='Zaloguj się' />
      <LoginForm />
    </DefaultLayout>
  );
};

export default LoginPage;
