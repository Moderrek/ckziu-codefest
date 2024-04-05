import {useRouter} from 'next/router'

export default function Page() {
  const router = useRouter();

  const profileName: string = router.query.profilename as string;
  const projectName: string = router.query.projectname as string;

  return <p>Profile: {profileName} Project: {projectName}</p>
}