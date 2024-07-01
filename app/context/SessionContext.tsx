// app/context/SessionContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

// Define o tipo User com as propriedades necessárias
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: number; // Adiciona a propriedade role
  token?: string; // Adiciona a propriedade token
}

// Atualiza o tipo Session para incluir a propriedade user
interface CustomSession extends Session {
  user?: User;
}

// Define o tipo do contexto com o CustomSession
interface SessionContextType {
  userSession: CustomSession | null;
}

// Cria o contexto com o tipo CustomSession
const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const AppSessionProvider = ({ children }: { children: ReactNode }) => {
  const [userSession, setUserSession] = useState<CustomSession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUserSession(session as CustomSession); // Assegura que a sessão tem o tipo CustomSession
    };
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ userSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useUserSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useUserSession must be used within a AppSessionProvider");
  }
  return context.userSession;
};
