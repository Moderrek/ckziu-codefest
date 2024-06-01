import { useContext } from "react";

import { DialogCreateProject } from "@/components/dialog/CreateProjectDialog";
import { Projects } from "@/components/fetchable/Projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useName } from "@/globalstate/useName";
import ProfileContext from "@/pages-components/profile/ProfileContext";
import { ProfilePosts } from "@/pages-components/profile/ProfilePosts";
import { User } from "@/utils/FetchProfile";

const ProfileTabs = () => {
  const user: User = useContext(ProfileContext);
  const name: string | null = useName();
  const isOwner: boolean = name !== null && name === user.name;

  return (
    <Tabs defaultValue="projects" className="w-full">
      <TabsList>
        <TabsTrigger value="posts">Wpisy</TabsTrigger>
        <TabsTrigger value="projects">Projekty</TabsTrigger>
        {/*<TabsTrigger value="liked_projects">Polubione projekty</TabsTrigger>*/}
      </TabsList>
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
