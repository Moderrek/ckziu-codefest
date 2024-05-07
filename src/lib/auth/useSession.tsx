import { useEffect, useState } from 'react';

import { AuthSession, getSession } from '@/lib/auth/getSession';

function useSession() {
  const [session, setSession] = useState<undefined | AuthSession>();

  useEffect(() => {
    if (window.session === undefined) {
      (async () => {
        const res = await getSession();
        setSession(res);
      })();
    }
  }, []);

  useEffect(() => {
    window.session = session;
  }, [session]);

  return session;
}

function useOwner(session: AuthSession | undefined, otherName: string) {
  const [owner, setOwner] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      setOwner(session.name === otherName);
    }
  }, [otherName, session]);

  return owner;
}

export { useOwner, useSession };
