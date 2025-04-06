import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  level: number;
  setLevel: (level: number) => void;
};

const UserContext = createContext<UserContextType>({
  level: 1,
  setLevel: () => {},
});

export const LevelProvider = ({ children }: { children: ReactNode }) => {
  const [level, setLevel] = useState(1);

  return (
    <UserContext.Provider value={{ level, setLevel }}>
      {children}
    </UserContext.Provider>
  );
};

export const useLevel = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
