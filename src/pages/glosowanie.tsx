import { Button, Tooltip } from "@material-tailwind/react";
import axios from "axios";
import { Check, Eye, Vote } from "lucide-react";

import { API_V1 } from "@/lib/api/api";

import { useToast } from "@/components/ui/use-toast";

import CkziuLogo from "@/shared-components/icon/CkziuLogo";
import DefaultLayout from "@/shared-components/layout/DefaultLayout";
import Seo from "@/shared-components/layout/Seo";
import UnstyledLink from "@/shared-components/link/UnstyledLink";
import { useRouter } from "next/router";
import { useState } from "react";

type VoteProject = {
  // Indexable
  id: string;
  ownerId: string;
  name: string;

  ownerName: string;
  ownerDisplayName: string;

  // Data
  displayName: string;
  description: string;

  votes: number;
  // Update timestamp milliseconds
  updatedAt: number;
  // Create timestamp milliseconds
  createdAt: number;
}

const VotableProject = ({ project }: { project: VoteProject }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold text-amber-700">1. @{project.ownerName}/{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
};

const VotePage = ({ projects }: { projects: VoteProject[] | null }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [voted, setVoted] = useState(false);

  // If there are no projects, display a message
  if (projects == null) return (<DefaultLayout>
    <Seo title="Głosowanie" />
    <div className="flex flex-col justify-center">
      <CkziuLogo width={128} height={128} />
      <h1 className="font-title text-4xl">FINAŁ | GŁOSOWANIE</h1>
    </div>
    <div className="flex justify-center">
      <p>Brak projektów do wyświetlenia.</p>
    </div>
  </DefaultLayout>);

  const handleVote = async (projectId: string) => {
    try {
      const res = await axios.get(`${API_V1}/contestprojects/${projectId}/vote`);
      const { data } = res;
      if (data.created) {
        toast({
          title: "Sukces",
          description: "Głosowanie zakończone sukcesem.",
        });
        await router.push("/");
        setVoted(true);
        return;
      }
      toast({
        variant: "destructive",
        title: "Nie można głosować",
        description: `Nie można zagłosować. ${data.message}`,
      });
      if (data.message === "Już zagłosowałeś!") {
        setVoted(true);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Zaloguj się aby głosować",
          description: `Wystąpił błąd podczas głosowania. Zaloguj się.`,
        });
        await router.push("/zaloguj");
        return;
      }
      toast({
        variant: "destructive",
        title: "Błąd",
        description: `Wystąpił błąd podczas głosowania. ${error.message}`,
      });
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <Seo title="Głosowanie" />
      {/* Voting Heading */}
      <section className="main-section mb-10">
        <div className="flex flex-col items-center">
          <CkziuLogo width={100} height={100} />
          <h2 className="text-center font-title text-4xl font-bold">
            FINAŁ CODEFEST24
          </h2>
          <h1 className="text-center text-2xl font-bold">
            Głosowanie
          </h1>
        </div>
      </section>
      <section className="container mb-10">
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {projects.map((project, index) => (
            <div className="border-gradient flex w-full flex-col rounded-xl border-2 bg-blue-gray-50 px-8 py-4 text-gray-900 dark:bg-gray-900 dark:text-gray-50 md:w-1/3 lg:w-1/4" key={index}>
              <UnstyledLink href={`/p/${project.ownerName}/${project.name}`}>
              <h3 className="mb-2 break-all text-xl font-bold hover:cursor-pointer hover:underline">@{project.ownerName}<span className="text-muted-foreground ">/</span>{project.name}</h3>
              </UnstyledLink>
              <p className="mb-4 text-sm">{project.description}</p>
              <p className="mb-2 text-xs">Głosy: {project.votes}</p>
              <div className="flex grow flex-row items-end gap-2">
                <Tooltip content="Zostaniesz przeniesiony na strone projektu.">
                  <UnstyledLink href={`/p/${project.ownerName}/${project.name}`}>
                    <Button color="green" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className="flex flex-row items-center gap-1 p-2 text-xs font-semibold"><Eye className="size-4"/>Zobacz projekt</Button>
                  </UnstyledLink>
                </Tooltip>
                <Tooltip content="UWAGA! Po oddaniu głosu nie można go cofnąć.">
                  <Button color="blue" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} disabled={voted} onClick={() => handleVote(project.id)} className="flex flex-row items-center gap-1 p-2 text-xs font-semibold">{ voted ? <><Check className="size-4"/> Zagłosowano</> : <><Vote className="size-4"/> Oddaj głos</> }</Button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
};

const getServerSideProps = async () => {

  let projects: VoteProject[] | null = null;
  try {
    const res = await axios.get(`${API_V1}/contestprojects`);
    const { data } = res;
    projects = data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      projects: projects
    }
  };
};

export { getServerSideProps };
export default VotePage;