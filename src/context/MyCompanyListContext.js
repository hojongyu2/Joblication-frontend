import {
  createContext, useContext, useEffect, useState,
} from "react";
import Axios from "../utilities/Axios";
import { userContext } from "./UserContext";

export const MyCompanyListContext = createContext();

function MyCompanyListProvider(props) {
  const { children } = props;
  const [myCompanyList, setMyCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [isMyCompanyDataLoading, setIsMyCompanyDataLoading] = useState(false);

  const { user } = useContext(userContext);

  // useEffect is watching isMyCompanyDataLoading state variable and whenever there is a change;
  // useEffect will fetch the data from the backend and update it;

  useEffect(() => {
    if (user) {
      const getMyCompanyResponse = async () => {
        const response = await Axios.get("/get-savedCompany");
        setMyCompanyList(response.data);
      };
      getMyCompanyResponse();
    } else {
      setMyCompanyList([]);
    }
  }, [isMyCompanyDataLoading]);

  return (
    <MyCompanyListContext.Provider value={{
      myCompanyList,
      setMyCompanyList,
      companyId,
      setCompanyId,
      setIsMyCompanyDataLoading,
    }}
    >
      {children}
    </MyCompanyListContext.Provider>
  );
}

export default MyCompanyListProvider;
