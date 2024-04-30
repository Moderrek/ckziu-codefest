import { Button } from '@material-tailwind/react';
import { Plus } from 'lucide-react';
import { useContext } from 'react';

import { useOwner, useSession } from '@/lib/auth/useSession';

import { Projects } from '@/components/fetchable/Projects';
import ProfileContext from '@/components/profile/ProfileContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        {owner ? (
          <Button
            variant='gradient'
            color='green'
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className='p-2 m-1 center'
          >
            <Plus width={16} height={16} /> Utwórz projekt
          </Button>
        ) : (
          <></>
        )}
        <div className='flex flex-row flex-wrap justify-center gap-4'>
          <Projects />
        </div>
      </TabsContent>
      <TabsContent value='liked_projects'></TabsContent>
    </Tabs>
  );
};

export { ProfileTabs };
