import { NextPage } from 'next';

import DefaultLayout from '@/components/layout/DefaultLayout';
import Seo from '@/components/Seo';

const VotingPage: NextPage = (): JSX.Element => {
  return (
    <DefaultLayout>
      <Seo
        templateTitle='Głosowanie CKZiU CodeFest 2024'
        description='Głosowanie na projekty w konkursie CKZiU CodeFest 2024'
      />
      <div className='align-center flex justify-center pt-10'>
        <p>GŁOSOWANIE</p>
      </div>
    </DefaultLayout>
  );
};

export default VotingPage;
