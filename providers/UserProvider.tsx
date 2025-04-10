import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setAge: (age: string) => void;
};

const UserContext = createContext<UserContextType>({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  age: "",
  setFirstName: () => {},
  setLastName: () => {},
  setUsername: () => {},
  setEmail: () => {},
  setAge: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  return (
    <UserContext.Provider
      value={{
        firstName,
        lastName,
        username,
        email,
        age,
        setFirstName,
        setLastName,
        setUsername,
        setEmail,
        setAge,
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
