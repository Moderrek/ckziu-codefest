import { ReactElement } from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

const ProfileLink = (props: {
  href: string;
  label: string;
  icon: ReactElement;
}) => {
  return (
    <UnstyledLink href={props.href} className="flex flex-row items-center">
      {props.icon}
      <span className="text-middle pl-1 pt-0.5">{props.label}</span>
    </UnstyledLink>
  );
};

export { ProfileLink };
