import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  phone: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  favoriteRoutes: string[];
  toggleFavorite: (routeId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    name: "Rajveer Singh",
    phone: "+91 98765 43210"
  });
  const [favoriteRoutes, setFavoriteRoutes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = (routeId: string) => {
    setFavoriteRoutes(prev => 
      prev.includes(routeId) 
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    );
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      favoriteRoutes,
      toggleFavorite,
      isLoading,
      setIsLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
