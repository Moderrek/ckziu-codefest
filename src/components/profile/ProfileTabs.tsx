import { useContext } from 'react';

import { DialogCreateProject } from '@/components/dialog/CreateProjectDialog';
import { Projects } from '@/components/fetchable/Projects';
import { ProfileBoard } from '@/components/profile/ProfileBoard';
import ProfileContext from '@/components/profile/ProfileContext';
import { ProfilePosts } from '@/components/profile/ProfilePosts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useName } from '@/globalstate/useName';
import { User } from '@/utils/FetchProfile';

const ProfileTabs = () => {
  const user: User = useContext(ProfileContext);
  const name: string | null = useName();
  const isOwner: boolean = name !== null && name === user.name;

  return (
    <Tabs defaultValue="tablica" className="w-full">
      <TabsList>
        <TabsTrigger value="tablica">Tablica</TabsTrigger>
        <TabsTrigger value="posts">Wpisy</TabsTrigger>
        <TabsTrigger value="projects">Projekty</TabsTrigger>
        <TabsTrigger value="liked_projects">Polubione projekty</TabsTrigger>
      </TabsList>
      <TabsContent value="tablica">
        <ProfileBoard />
      </TabsContent>
      <TabsContent value="posts">
        <ProfilePosts />
      </TabsContent>
      <TabsContent value="projects">
        {isOwner ? <DialogCreateProject /> : <></>}
        <div className="flex size-full">
          <div className="flex flex-row flex-wrap justify-center gap-2 md:justify-normal lg:gap-8">
            <Projects />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="liked_projects"></TabsContent>
    </Tabs>
  );
};

export { ProfileTabs };
