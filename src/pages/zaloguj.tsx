import { Footer } from '@/components/component/Footer';
import LoginForm from '@/components/login_form';
import Seo from '@/components/Seo';
import { NextPage } from 'next';

const LoginPage: NextPage = (): JSX.Element => {
  return (
    <>
      <Seo templateTitle='Zaloguj się' />
      {/*<Navbar/>*/}
      <div className='flex min-h-screen flex-col'>
        <div className='flex-auto'>
          <div className='flex w-full flex-col items-center justify-center justify-self-center'>
            <LoginForm />
          </div>
        </div>
        <div className='h-14 flex-none'>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
