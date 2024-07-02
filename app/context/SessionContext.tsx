// SessionContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<string | undefined>(undefined);

export const AppSessionProvider = ({ children }: SessionProviderProps) => {
  const [userSession, setUserSession] = useState<string>();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      const dataSessio = JSON.stringify(session);
      setUserSession(dataSessio);
    };
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={userSession}>
      {children}
    </SessionContext.Provider>
  );
};

export const useUserSession = () => useContext(SessionContext);
