import { createContext } from 'react';

import { AuthSession } from '@/lib/auth/getSession';

const SessionContext = createContext<AuthSession | undefined>(undefined);

export { SessionContext };
