import { Button } from "@material-tailwind/react";
import { LogOut } from "lucide-react";

import CkziuLogo from "@/shared-components/icon/CkziuLogo";
import DefaultLayout from "@/shared-components/layout/DefaultLayout";
import Seo from "@/shared-components/layout/Seo";
import UnstyledLink from "@/shared-components/link/UnstyledLink";

// 404 Not Found Page
const NotFound = () => {
  return (
    // Footer _MAIN_ Navbar
    <DefaultLayout>
      {/* Page title and SEO */}
      <Seo templateTitle="Nieznaleziono strony" />
      {/* Main top centered section */}
      <section className="main-section">
        {/* Column center */}
        <div className="flex flex-col items-center">
          {/* Logo */}
          <CkziuLogo width={100} height={100} />
          <h2 className="text-center font-title text-4xl font-bold">
            CODEFEST
          </h2>
          {/* Description */}
          <h1 className="text-center text-2xl font-bold">
            <span className="font- text-4xl">404 |</span> Nieznaleziono strony.
          </h1>
          {/* Go to homepage */}
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
};

export default NotFound;
