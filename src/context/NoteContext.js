import {
  createContext, useContext, useEffect, useState,
} from "react";
import Axios from "../utilities/Axios";
import { MyCompanyListContext } from "./MyCompanyListContext";

export const NoteContext = createContext();

function NoteContextProvider(props) {
  const { children } = props;
  const [myNote, setMyNote] = useState([]);
  const [isMyNoteDataLoading, setIsMyNoteDataLoading] = useState(false);
  const { companyId } = useContext(MyCompanyListContext);
  // console.log(companyId)
  // useEffect is watching isMyNoteDataLoading state variable and whenever there is a change;
  // useEffect will fetch the data from the backend and update it;
  useEffect(() => {
    if (companyId) {
      const getMyNotes = async () => {
        const response = await Axios.post("/get-notes", { savedCompanyId: companyId });
        setMyNote(response.data);
      };
      getMyNotes();
    }
  }, [isMyNoteDataLoading], [companyId]);

  return (
    <NoteContext.Provider value={{ myNote, setMyNote, setIsMyNoteDataLoading }}>
      {children}
    </NoteContext.Provider>
  );
}
export default NoteContextProvider;
