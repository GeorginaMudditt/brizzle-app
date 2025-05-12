import { createContext, ReactNode, useContext, useState } from "react";

type UserState = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type UserContextType = UserState & {
  setUser: (user: UserState) => void;
};

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
};

const UserContext = createContext<UserContextType>({
  ...initialState,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserState>(initialState);

  return (
    <UserContext.Provider
      value={{
        ...user,
        setUser,
      }}
    >
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
