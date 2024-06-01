import axios from "axios";
import { createRef, FormEvent, useContext, useState } from "react";

import { cn } from "@/lib/utils";

import NextImage from "@/components/NextImage";

import { useName } from "@/globalstate/useName";
import ProfileContext from "@/pages-components/profile/ProfileContext";
import { User } from "@/utils/FetchProfile";

interface ProfileAvatarProps {
  profileName: string;
}

const ProfileAvatarUploadable = ({ profileName }: ProfileAvatarProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const input = createRef<HTMLInputElement>();

  const avatarClick = () => {
    if (uploading) return;
    input.current?.click();
  };

  const avatarSelect = async () => {
    if (!input.current) return;
    if (!input.current.files) return;
    setUploading(true);
    const formData = new FormData();
    const file = input.current.files[0];
    formData.append("avatar", file);
    await axios.post(``, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    setUploading(false);
  };

  const handleForm = (event: FormEvent) => {
    event.preventDefault();
  };

  return <form onSubmit={handleForm}>
    <NextImage alt={profileName} width={160} height={160} src="https://avatars.githubusercontent.com/u/66324421?v=4"
               className={cn("size-28 select-none lg:size-40 hover:animate-select", uploading ? "opacity-30 animate-pulse" : "")}
               imgClassName="rounded-full"
               onClick={avatarClick} />
    <input type="file" id="avatar" className="hidden" accept="image/png, image/jpeg, image/gif" ref={input}
           onChange={avatarSelect} />
  </form>;

};

const ProfileAvatar = ({ profileName }: ProfileAvatarProps) => {
  const user: User = useContext(ProfileContext);
  const name: string | null = useName();
  const isOwner: boolean = name !== null && name === user.name;

  if (!isOwner) return <NextImage alt={profileName} width={160} height={160}
                                  src="https://avatars.githubusercontent.com/u/66324421?v=4"
                                  className="size-28 select-none lg:size-40" imgClassName="rounded-full" />;
  return <ProfileAvatarUploadable profileName={profileName} />;
};

export { ProfileAvatar };
