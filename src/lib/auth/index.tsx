import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Automatically redirects user to login page if not logged.
 * @param isLoggedIn
 */
const useRequiredLogin = (isLoggedIn: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/zaloguj");
  }, [isLoggedIn, router]);
};

export { useRequiredLogin };
