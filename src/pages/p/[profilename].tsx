import { Button } from "@material-tailwind/react";
import { LogOut, Server } from "lucide-react";
import { useEffect, useState } from "react";

import { useOwner, useSession } from "@/lib/auth/useSession";

import { siteConfig } from "@/constants/site";
import useGlobalState from "@/globalstate/useGlobalState";
import { statusUrl } from "@/pages/status";
import { ProfileContent } from "@/pages-components/profile/ProfileContent";
import CkziuLogo from "@/shared-components/icon/CkziuLogo";
import DefaultLayout from "@/shared-components/layout/DefaultLayout";
import Seo from "@/shared-components/layout/Seo";
import UnstyledLink from "@/shared-components/link/UnstyledLink";
import { FetchUser, FetchUserAxios, User } from "@/utils/FetchProfile";

interface ProfilePageProps {
  username: string;
  serveruser: User | null;
  serverproblem: boolean;
}

// Server or Client side
const ProfilePage = ({ username, serveruser, serverproblem }: ProfilePageProps) => {
  const [user, setUser] = useState<User | null>(serveruser);

  const session = useSession();
  const isOwner = useOwner(session, username);

  const gs = useGlobalState();

  useEffect(() => {
    // First. load from global state
    if (gs?.globalState) {
      const { globalState } = gs;
      if (globalState.profiles.has(username)) {
        setUser(globalState.profiles.get(username) as User);
      } else {
        if (user) gs.globalState.profiles.set(username, user);
      }
    }
    // Fetch
    (async () => {
      try {
        const fetchedUser = await FetchUserAxios(username);
        if (fetchedUser) {
          if (gs?.globalState) gs.globalState.profiles.set(username, fetchedUser);
          setUser(fetchedUser);
        }
      } catch (err) { /* ignored */
      }
    })();
  }, []);

  // Server Problem
  if (serverproblem) {
    return (
      <DefaultLayout>
        <Seo templateTitle="Nie udało się znaleźć profilu" />
        <section className="main-section">
          <div className="flex flex-col items-center">
            <CkziuLogo width={100} height={100} />
            <h2 className="text-center font-title text-4xl font-bold">{siteConfig.shortName.toUpperCase()}</h2>
            <p className="text-center text-2xl">
              Przepraszamy. Wystąpił problem<br />od strony serwera CodeFest.<br />Spróbuj ponownie później.
            </p>
            <div className="flex flex-row gap-2">
              <UnstyledLink href={statusUrl}>
                <Button
                  color="green"
                  className="center mt-5 flex-row gap-1"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}>
                  <Server /> Sprawdź status serwerów
                </Button>
              </UnstyledLink>
              <UnstyledLink href="/">
                <Button
                  color="orange"
                  className="center mt-5 flex-row gap-1"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <LogOut /> Wróć na stronę główną
                </Button>
              </UnstyledLink>
            </div>

          </div>
        </section>
      </DefaultLayout>
    );
  }

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
    .replace(" ", "-")
    .trim()
    .toLowerCase();

  // Fetched user from API can be User or null.
  // Null means Not Found.
  const user: undefined | null | User = await FetchUser(profilename);

  return {
    props: {
      serverproblem: user === undefined,
      username: profilename,
      serveruser: user ?? null
    }
  };
};

export { getServerSideProps };
export default ProfilePage;
