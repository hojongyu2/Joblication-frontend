import { createContext, useState } from "react";

export const NoteContext = createContext();

function NoteContextProvider(props) {
  const { children } = props;
  const [myNote, setMyNote] = useState([]);
  return (
    <NoteContext.Provider value={{ myNote, setMyNote }}>
      {children}
    </NoteContext.Provider>
  );
}
export default NoteContextProvider;
