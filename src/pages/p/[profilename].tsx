import { Button } from '@material-tailwind/react';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useOwner, useSession } from '@/lib/auth/useSession';

import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import { ProfileContent } from '@/components/profile/ProfileContent';
import Seo from '@/components/Seo';

import useGlobalState from '@/globalstate/useGlobalState';
import { FetchUser, FetchUserAxios, User } from '@/utils/FetchProfile';

interface ProfilePageProps {
  username: string;
  serveruser: User | null;
}

// Server or Client side
const ProfilePage = ({ username, serveruser }: ProfilePageProps) => {
  const [user, setUser] = useState<User | null>(serveruser);
  const [fetched, setFetched] = useState(false);

  const session = useSession();
  const isOwner = useOwner(session, username);

  const globalState = useGlobalState();

  useEffect(() => {
    if (serveruser == null) return;
    (async () => {
      if (isOwner && !fetched) {
        setFetched(true);
        if (globalState) {
          if (globalState.globalState?.profiles.has(username)) {
            const user = globalState.globalState?.profiles.get(username);
            if (user) {
              console.log('BRING BACK CACHED');
              setUser(user);
              return;
            }
          }
        }
        const fetchedUser = await FetchUserAxios(username);
        if (fetchedUser != null) {
          if (globalState) {
            console.log('SET GLOBAL STATE');
            globalState.globalState?.profiles.set(username, fetchedUser);
          }
          setUser(fetchedUser);
        }
      }
    })();
  }, [isOwner]);

  // User Not Found
  if (user === null) {
    return (
      <DefaultLayout>
        <Seo templateTitle="Nie znaleziono profilu" />
        <section className="main-section">
          <div className="flex flex-col items-center">
            <CkziuLogo width={100} height={100} />
            <h2 className="text-center font-title text-4xl font-bold">
              CODEFEST
            </h2>
            <h1 className="text-center text-2xl font-bold">
              Nie znaleziono profilu <i>@{username}</i>
            </h1>
            <UnstyledLink href="/">
              <Button
                color="red"
                className="center mt-5 flex-row gap-1"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <LogOut /> Wróć na stronę główną
              </Button>
            </UnstyledLink>
          </div>
        </section>
      </DefaultLayout>
    );
  }

  // Shows user profile
  return <ProfileContent user={user} />;
};

const getServerSideProps = async ({
                                    query
                                  }: {
  query: { profilename: string };
}) => {
  // Extract profile name from query
  // https://ckziucodefest.pl/p/PROFILE_NAME
  let { profilename } = query;
  profilename = profilename
    .trimEnd()
    .trimStart()
    .replace(' ', '-')
    .trim()
    .toLowerCase();

  // Fetched user from API can be User or null.
  // Null means Not Found.
  const user: User | null = await FetchUser(profilename);

  return {
    props: {
      username: profilename,
      serveruser: user
    }
  };
};

export { getServerSideProps };
export default ProfilePage;
