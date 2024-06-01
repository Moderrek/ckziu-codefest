import { ReactNode, useEffect } from "react";

import DefaultLayout from "@/shared-components/layout/DefaultLayout";
import Seo from "@/shared-components/layout/Seo";

interface RedirectPageProps {
  url: string;
  title?: string;
  children?: ReactNode;
}

const RedirectPage = ({ title, url, children }: RedirectPageProps) => {
  useEffect(() => {
    window.location.assign(url);
  });
  return (
    <DefaultLayout>
      <Seo templateTitle={title} />
      {children ? children : <p>Przekierowywanie...</p>}
    </DefaultLayout>
  );
};

export { RedirectPage };
