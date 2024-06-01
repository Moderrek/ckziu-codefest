import React from "react";

import { LoginForm } from "@/components/login/LoginForm";

import DefaultLayout from "@/shared-components/layout/DefaultLayout";
import Seo from "@/shared-components/layout/Seo";
import { GetAPIStatus } from "@/utils/GetAPIStatus";

interface LoginPageProps {
  loginService: boolean;
}

const LoginPage = ({ loginService }: LoginPageProps) => {
  return (
    <DefaultLayout>
      <Seo templateTitle="Zaloguj się" />
      <div className="center pt-10">
        <LoginForm loginService={loginService} />
      </div>
    </DefaultLayout>
  );
};

export async function getServerSideProps() {
  const status = await GetAPIStatus();

  return {
    props: {
      loginService: status.services.login_service
    }
  };
}

export default LoginPage;
