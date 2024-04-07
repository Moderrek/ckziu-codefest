import Image from 'next/image';
import useSWR from 'swr';

import { API_URL } from '@/lib/api';
import { ApiProjectData, ApiProjectsData } from '@/lib/api_responses';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Project = (props: { project: ApiProjectData }) => {
  const project: ApiProjectData = props.project;

  return (
    <div className='max-w-sm overflow-hidden rounded shadow-lg'>
      <Image
        src={project.thumbnail_url}
        alt='ckziu_thumbnail'
        width={1140}
        height={760}
        className='min-w-fill'
      />
      <div className='px-6 py-4'>
        <div className='mb-2 text-xl font-bold'>{project.display_name}</div>
        <p className='text-base text-gray-700'>{project.description}</p>
      </div>
      {project.likes} likes
    </div>
  );
};

const Projects = () => {
  const { data, error } = useSWR<ApiProjectsData, Error>(
    API_URL + '/trending/projects',
    fetcher
  );

  // Show empty skeleton articles while loading or error.
  if (!data || error) return <></>;

  // Render articles
  return (
    <>
      {data.map((project, idx) => {
        return <Project key={idx} project={project} />;
      })}
    </>
  );
};

export { Project, Projects };
