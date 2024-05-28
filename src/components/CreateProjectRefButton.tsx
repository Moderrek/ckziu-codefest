import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { profileOrLogin } from '@/config/constants';
import { useName } from '@/globalstate/useName';

const CreateProjectRefButton = () => {
  const [redirecting, setRedirecting] = useState(false);
  const name = useName();

  const router = useRouter();

  const handleClick = async () => {
    setRedirecting(true);
    await router.push(profileOrLogin(name));
    setRedirecting(false);
  };

  return <Button
    variant="filled"
    color="blue"
    placeholder={undefined}
    onPointerEnterCapture={undefined}
    onPointerLeaveCapture={undefined}
    className="mt-5 w-1/3"
    onClick={handleClick}
    loading={redirecting}
  >
    Utwórz projekt
  </Button>;
};

export { CreateProjectRefButton };
