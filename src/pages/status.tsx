import { Button } from '@material-tailwind/react';
import { LogOut } from 'lucide-react';

import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { GetAPIStatus } from '@/utils/GetAPIStatus';

interface ServiceStatusProps {
  name: string;
  operational: boolean;
}

interface StatusPageProps {
  loginService: boolean;
  cezWebsite: boolean;
}

const ServiceStatus = ({ name, operational }: ServiceStatusProps) => {
  return (
    <div className='flex w-full flex-row justify-between'>
      <p>{name}</p>
      {operational ? (
        <p className='text-green-400'>Uruchomione</p>
      ) : (
        <p className='font-bold text-red-400 underline'>Nieaktywny</p>
      )}
    </div>
  );
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
          <ServiceStatus name='Logowanie' operational={loginService} />
          <ServiceStatus name='Profil' operational={loginService} />
          <ServiceStatus name='Strona szkoły' operational={cezWebsite} />
        </div>
      </section>
    </DefaultLayout>
  );
};

export async function getServerSideProps() {
  const status = await GetAPIStatus();

  return {
    props: {
      loginService: status.services.login_service,
      cezWebsite: status.services.login_service,
    },
  };
}

export default StatusPage;
