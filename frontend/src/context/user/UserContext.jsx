import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const withUserProvider = (Component) => {
  return (props) => {
    return (
      <UserProvider>
        <Component {...props} />
      </UserProvider>
    );
  };
};
