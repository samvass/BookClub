import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages//HomePage/HomePage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import MyLibraryPage from "./pages/MyLibraryPage/MyLibraryPage";
import SelectPreferencesPage from "./pages/SelectPreferencesPage/SelectPreferencesPage";


import NavBar from "./components/Navbar/NavBar";
import { authenticateUserByToken } from "./api/authAPI";
import { getUserByUserName } from "../src/api/userAPI";
import "./App.css";
import AuthContext from "./Context/AuthContext";

const App = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  const authToken = async (sessionInfo) => {
    const { username, token } = sessionInfo;
    // call the backend to authenticate
    console.log("HANDLING TOKENS");
    const body = {
      token: token,
    };
    const res = await authenticateUserByToken(body);

    if (res.message !== "Authentication Successful"){
      console.log(res.error, "error")
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("token")
      return
    }

    sessionStorage.setItem("token", token);
    setToken(token);
    
    const user = await getUserByUserName(username);
    sessionStorage.setItem("username", username);
    setUser(user);
  };

  const logout = () => {
    setToken(null)
    setUser(null)
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")

  }

  useEffect(() => {
    let token = sessionStorage.getItem("token")
    let username = sessionStorage.getItem("username")
    if (token) {
      authToken({
        token: token,
        username: username,
      });
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          token: token,
          user: user,
          setToken: authToken,
          setUser: setUser,
          logout: logout
        }}
      >
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/myAccount" element={<MyAccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<CreateAccountPage />} />
            <Route path="/myLibrary" element={<MyLibraryPage />} />
            <Route path="/setPreferences" element={<SelectPreferencesPage />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
