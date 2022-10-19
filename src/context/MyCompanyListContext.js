import { createContext, useState } from "react";

export const MyCompanyListContext = createContext();

function MyCompanyListProvider(props) {
  const { children } = props;
  const [myCompanyList, setMyCompanyList] = useState([]);
  console.log(myCompanyList)
  return (
    <MyCompanyListContext.Provider value={{ myCompanyList, setMyCompanyList }}>
      {children}
    </MyCompanyListContext.Provider>
  );
}

export default MyCompanyListProvider;
