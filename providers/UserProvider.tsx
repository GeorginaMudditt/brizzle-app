import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  username: string;
  email: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
};

const UserContext = createContext<UserContextType>({
  username: "",
  email: "",
  setUsername: () => {},
  setEmail: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <UserContext.Provider value={{ username, email, setUsername, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
