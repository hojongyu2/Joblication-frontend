import { createContext, useState } from "react";

export const SearchContext = createContext();

function SearchContextProvider(props) {
  const { children } = props;
  const [search, setSearch] = useState({
    jobTitle: "",
    location: "",
  });
  const [pagenatedData, setPagenatedData] = useState(undefined);
  return (
    <SearchContext.Provider value={{
      search, setSearch, pagenatedData, setPagenatedData,
    }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
