import { createContext, useState, ReactNode, useContext, act } from "react";

interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: (action?: string) => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebarContext = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = (action?: string) => {
    setIsSideBarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
