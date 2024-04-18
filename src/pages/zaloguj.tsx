import React from 'react';

import { API_V1 } from '@/lib/api/api';
import { ApiStatus } from '@/lib/api/api_responses';

import DefaultLayout from '@/components/layout/DefaultLayout';
import { LoginForm } from '@/components/login/LoginForm';
import Seo from '@/components/Seo';

const LoginPage = ({ loginService }: { loginService: boolean }) => {
  return (
    <DefaultLayout>
      <Seo templateTitle='Zaloguj się' />
      <div className='center pt-10'>
        <LoginForm loginService={loginService} />
      </div>
    </DefaultLayout>
  );
};

export async function getServerSideProps() {
  let loginServiceAvailable = false;
  try {
    const res = await fetch(API_V1 + '/status');
    const status: ApiStatus = await res.json();
    loginServiceAvailable = status.services.login_service;
  } catch (error) {
    /* empty */
  }

  return {
    props: {
      loginService: loginServiceAvailable,
    },
  };
}

export default LoginPage;
