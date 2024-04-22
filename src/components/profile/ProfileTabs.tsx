import { Projects } from '@/components/fetchable/Projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfileTabs = () => {
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
        <div className='flex flex-row flex-wrap justify-center gap-4'>
          <Projects />
        </div>
      </TabsContent>
      <TabsContent value='liked_projects'></TabsContent>
    </Tabs>
  );
};

export { ProfileTabs };
