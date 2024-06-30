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

const SessionContext = createContext<Session | null>(null);

export const AppSessionProvider = ({ children }: SessionProviderProps) => {
  const [userSession, setUserSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUserSession(session);
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
