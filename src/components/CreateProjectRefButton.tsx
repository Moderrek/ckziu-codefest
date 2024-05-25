import { useAuthorized } from '@/globalstate/useAuth';

const CreateProjectRefButton = () => {
  const isAuthorized = useAuthorized();

  return isAuthorized ? 'auth' : 'not auth';
};

export { CreateProjectRefButton };
