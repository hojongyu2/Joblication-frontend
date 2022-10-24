import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

function UserContextProvider(props) {
  const { children } = props;
  // if there is a "userState", then userInitialState will get a value from Local storage;
  // else will be undefined;
  const userInitialState = localStorage.getItem("userState") ? JSON.parse(localStorage.getItem("userState")) : undefined;

  const [user, SetUser] = useState(userInitialState);
  // console.log(user)
  // useEffect to track user state;
  useEffect(() => {
    if (user) {
      localStorage.setItem("userState", JSON.stringify(user));
    } else {
      localStorage.clear("userState");
    }
  }, [user]);

  const signIn = (userData) => SetUser(userData);
  const signOut = () => SetUser(undefined);

  // for admin
  const [allUsers, setAllUsers] = useState([]);

  const [editUser, setEditUser] = useState({});

  return (
    <userContext.Provider value={{
      user, signIn, signOut, allUsers, setAllUsers, editUser, setEditUser
    }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
