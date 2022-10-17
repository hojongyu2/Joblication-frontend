import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login";
import MainPage from "./components/pages/MainPage";
import Signup from "./components/pages/Signup";
import SearchContextProvider from "./context/SearchContext";
import UserContextProvider from "./context/UserContext";
import CustomThemeProvider from "./CustomThemeProvider";

function App() {
  return (
    <CustomThemeProvider>
      <UserContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/main" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </UserContextProvider>
    </CustomThemeProvider>
  );
}

export default App;
