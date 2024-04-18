import { Button } from '@material-tailwind/react';
import { LogOut } from 'lucide-react';

import { API_V1 } from '@/lib/api/api';
import { ApiStatus } from '@/lib/api/api_responses';

import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

interface ServiceStatusProps {
  operational: boolean;
}

interface StatusPageProps {
  loginService: boolean;
  cezWebsite: boolean;
}

const ServiceStatus = ({ operational }: ServiceStatusProps) => {
  if (operational) {
    return <p className='text-green-400'>Uruchomione</p>;
  }
  return <p className='font-bold text-red-400 underline'>Nieaktywny</p>;
};

const StatusPage = ({ loginService, cezWebsite }: StatusPageProps) => {
  return (
    <DefaultLayout>
      <Seo templateTitle='Status Serwerów' />
      <section className='main-section'>
        <div className='flex flex-col items-center'>
          <CkziuLogo width={100} height={100} />
          <h2 className='font-title text-center text-4xl font-bold'>
            CODEFEST
          </h2>
          <h1 className='text-center text-2xl font-bold'>
            Dostępność serwerów
          </h1>
          <UnstyledLink href='/'>
            <Button
              color='green'
              className='center mt-5 flex-row gap-1'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <LogOut /> Wróć na stronę główną
            </Button>
          </UnstyledLink>
        </div>
      </section>
      <section className='main-section'>
        <div className='bg-card flex w-full flex-col items-center gap-2 rounded border p-4 drop-shadow md:w-2/3 lg:text-xl'>
          <div className='flex w-full flex-row justify-between'>
            <p>Logowanie</p>
            <ServiceStatus operational={loginService} />
          </div>
          <div className='flex w-full flex-row justify-between'>
            <p>Strona szkoły</p>
            <ServiceStatus operational={cezWebsite} />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export async function getServerSideProps() {
  let loginServiceAvailable = false;
  let cezWebsite = false;
  try {
    const res = await fetch(API_V1 + '/status');
    const status: ApiStatus = await res.json();
    loginServiceAvailable = status.services.login_service;
    cezWebsite = status.services.cez_website;
  } catch (error) {
    /* empty */
  }

  return {
    props: {
      loginService: loginServiceAvailable,
      cezWebsite: cezWebsite,
    },
  };
}

export default StatusPage;
