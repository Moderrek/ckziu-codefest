import { PostsOnProfile } from '@/components/Posts';

const ProfilePosts = () => {
  return <div className="flex justify-center">
    <div className="flex flex-col gap-4">
      <PostsOnProfile />
    </div>
  </div>;
};

export { ProfilePosts };