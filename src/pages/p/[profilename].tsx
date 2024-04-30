import DefaultLayout from '@/components/layout/DefaultLayout';
import { ProfileContent } from '@/components/profile/ProfileContent';
import Seo from '@/components/Seo';

import { FetchUser, User } from '@/utils/FetchProfile';

interface ProfilePageProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  if (user === null) {
    return (
      <DefaultLayout>
        <Seo templateTitle='Nie znaleziono profilu' />
        <p>Nie znaleziono profilu</p>
      </DefaultLayout>
    );
  }

  return <ProfileContent user={user} />;
};

export async function getServerSideProps({
  query,
}: {
  query: { profilename: string };
}) {
  const { profilename } = query;

  const user: User | null = await FetchUser(profilename);

  return {
    props: {
      user: user,
    },
  };
}

export default ProfilePage;
