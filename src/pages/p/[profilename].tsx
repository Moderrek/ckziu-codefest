import {useRouter} from 'next/router'

export default function Page() {
  const router = useRouter();

  const profileName: string = router.query.profilename as string;

  return <p>Profile: {profileName}</p>
}