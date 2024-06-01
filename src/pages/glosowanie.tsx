import axios from "axios";

import { API_V1 } from "@/lib/api/api";

import CkziuLogo from "@/shared-components/icon/CkziuLogo";
import DefaultLayout from "@/shared-components/layout/DefaultLayout";
import Seo from "@/shared-components/layout/Seo";
import { CodefestProject } from "@/utils/FetchProfile";

const VotePage = ({ projects }: { projects: CodefestProject[] | null }) => {

  if (projects == null) return (<DefaultLayout><h1>Brak projektów</h1></DefaultLayout>);

  return (
    <DefaultLayout>
      <Seo title="Głosowanie" />
      {/* Voting Heading */}
      <div className="flex flex-col justify-center">
        <CkziuLogo width={128} height={128} />
        <h1 className="font-title text-4xl">FINAŁ | GŁOSOWANIE</h1>
      </div>
      {/*  Top 3 projects */}
      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8">
          <h2 className="text-2xl font-bold">Top 3 projekty</h2>
          <div className="flex flex-row flex-wrap gap-2">

          </div>
        </div>
      </section>
      <div className="flex justify-center">
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div key={project.id} className="flex justify-center">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{index + 1}. {project.name}</h3>
                <p>{project.description}</p>
                <p>{project.likes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

const getServerSideProps = async () => {

  const projects: CodefestProject[] = (await axios.get(`${API_V1}/projects`)).data;

  return {
    props: {
      projects: projects
    }
  };
};

export default VotePage;