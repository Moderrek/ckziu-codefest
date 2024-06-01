import { Button } from "@material-tailwind/react";
import { CircleUser, LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useSession } from "@/lib/auth/useSession";

import { Button as ShadcnButton } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { useAuthorized } from "@/globalstate/useAuth";
import useGlobalState from "@/globalstate/useGlobalState";
import UnstyledLink from "@/shared-components/link/UnstyledLink";

export default function DropdownMenuDemo() {
  const router = useRouter();
  const session = useSession();
  const gs = useGlobalState();
  const globalState = gs?.globalState;
  const isAuthorized = useAuthorized();

  if (!isAuthorized) {
    return (
      <UnstyledLink href="/zaloguj">
        <Button
          variant="gradient"
          color="indigo"
          className="flex min-w-fit flex-1 flex-row items-center justify-center gap-1 p-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <LogIn className="size-5" /> Zaloguj się
        </Button>
      </UnstyledLink>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ShadcnButton variant="outline" className="gap-1">
          <CircleUser />@{globalState?.authorizedName}
        </ShadcnButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-45">
        <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAuthorized ? (
          <Link href={`/p/${globalState?.authorizedName}`}>
            <DropdownMenuItem>
              <div className="flex flex-row">
                <User className="mr-2 size-4" />
                Profil
              </div>
            </DropdownMenuItem>
          </Link>
        ) : (
          <Link href="/zaloguj">
            <DropdownMenuItem>
              <div className="flex flex-row">
                <User className="mr-2 size-4" />
                Zaloguj się
              </div>
            </DropdownMenuItem>
          </Link>
        )}
        {isAuthorized ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="bg-red-400 text-white"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("cachedName");

                if (globalState) {
                  globalState.authorizedName = null;
                  globalState.token = null;
                }

                router.push("/zaloguj");
              }}
            >
              <LogOut className="mr-2 size-4" />
              <span>Wyloguj się</span>
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
