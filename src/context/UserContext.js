import { createContext, useState } from "react";

export const userContext = createContext();

function UserContextProvider(props) {
  const { children } = props;
  const userInitialState = undefined;
  const [user, SetUser] = useState(userInitialState);
  const signIn = (userData) => SetUser(userData);
  const signOut = () => SetUser(userInitialState);
  // console.log(user);
  return (
    <userContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
