import { createContext, ReactNode, useContext, useState } from "react";

type SubAccount = {
  id: string;
  subAccountName: string;
};

type UserState = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subAccounts?: SubAccount[];
};

type UserContextType = UserState & {
  setUser: (user: UserState) => void;
  removeUser: () => void;
};

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  subAccounts: [],
};

const UserContext = createContext<UserContextType>({
  ...initialState,
  setUser: () => {},
  removeUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserState>(initialState);
  // TODO: use async storage to persist user data

  const removeUser = () => {
    setUser(initialState);
  };

  return (
    <UserContext.Provider
      value={{
        ...user,
        setUser,
        removeUser,
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
