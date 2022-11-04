import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/pages/AdminPage";
import LoginPage from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";
import ProfilePage from "./components/pages/ProfilePage";
import SignupPage from "./components/pages/SignupPage";
import MyCompanyListProvider from "./context/MyCompanyListContext";
import NoteContextProvider from "./context/NoteContext";
import SearchContextProvider from "./context/SearchContext";
import UserContextProvider from "./context/UserContext";
import CustomThemeProvider from "./CustomThemeProvider";
import JoblicationPage from "./components/pages/JoblicationPage";

function App() {
  return (
    <CustomThemeProvider>
      <UserContextProvider>
        <MyCompanyListProvider>
          <NoteContextProvider>
            <SearchContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/job-application" element={<JoblicationPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </BrowserRouter>
            </SearchContextProvider>
          </NoteContextProvider>
        </MyCompanyListProvider>
      </UserContextProvider>
    </CustomThemeProvider>
  );
}

export default App;
