import { useContext } from 'react';

import { useOwner, useSession } from '@/lib/auth/useSession';

import { Projects } from '@/components/fetchable/Projects';
import ProfileContext from '@/components/profile/ProfileContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { DialogCreateProject } from '../dialog/CreateProjectDialog';

const ProfileTabs = () => {
  const user = useContext(ProfileContext);
  const session = useSession();
  const owner = useOwner(session, user.name);
  return (
    <Tabs defaultValue='projects' className='w-full'>
      <TabsList>
        <TabsTrigger value='posts'>Posty</TabsTrigger>
        <TabsTrigger value='projects'>Projekty</TabsTrigger>
        <TabsTrigger value='liked_projects'>Polubione projekty</TabsTrigger>
      </TabsList>
      <TabsContent value='posts'>
        <h2>Profile Posts</h2>
      </TabsContent>
      <TabsContent value='projects'>
        {owner ? <DialogCreateProject /> : <></>}
        <div className='center'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8'>
            <Projects />
          </div>
        </div>
      </TabsContent>
      <TabsContent value='liked_projects'></TabsContent>
    </Tabs>
  );
};

export { ProfileTabs };
