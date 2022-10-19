import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import JoblicationPage from "./components/pages/JoblicationPage";
import Login from "./components/pages/Login";
import MainPage from "./components/pages/MainPage";
import Signup from "./components/pages/Signup";
import MyCompanyListProvider from "./context/MyCompanyListContext";
import NoteContextProvider from "./context/NoteContext";
import SearchContextProvider from "./context/SearchContext";
import UserContextProvider from "./context/UserContext";
import CustomThemeProvider from "./CustomThemeProvider";

function App() {
  return (
    <CustomThemeProvider>
      <NoteContextProvider>
        <UserContextProvider>
          <MyCompanyListProvider>
            <SearchContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/job-application" element={<JoblicationPage />} />
                </Routes>
              </BrowserRouter>
            </SearchContextProvider>
          </MyCompanyListProvider>
        </UserContextProvider>
      </NoteContextProvider>
    </CustomThemeProvider>
  );
}

export default App;
