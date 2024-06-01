import { useContext } from "react";

import { useName } from "@/globalstate/useName";
import ProfileContext from "@/pages-components/profile/ProfileContext";
import { User } from "@/utils/FetchProfile";

const ProfilePostCreate = () => {
  const user: User = useContext(ProfileContext);
  const name: string | null = useName();
  const isOwner: boolean = name !== null && name === user.name;
  if (!isOwner) return <></>;
  return "Creator";
};

export { ProfilePostCreate };