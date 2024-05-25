import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileAvatarProps {
  profileName: string;
}

const ProfileAvatar = ({ profileName }: ProfileAvatarProps) => {
  return (
    <Avatar className="size-28 select-none lg:size-40">
      <AvatarImage src="https://avatars.githubusercontent.com/u/66324421?v=4" />
      <AvatarFallback>{profileName}</AvatarFallback>
    </Avatar>
  );
};

export { ProfileAvatar };
