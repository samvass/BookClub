import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages//HomePage/HomePage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import LogoutPage from "./pages/LogoutPage";
import MyLibraryPage from "./pages/MyLibraryPage/MyLibraryPage";
import NavBar from "./components/navbar/NavBar";
import SelectPreferencesPage from "./pages/SelectPreferencesPage/SelectPreferencesPage"

import "./App.css"
import UserProvider from "./user/UserProvider";

const App = () => {
    const [sessionID, setSessionID] = useState("");

    return (
        <div className="App">
            <UserProvider>
                <Router>
                    <NavigationBar />
                    <NavBar />
                    <div>
                        <Routes>
                            <Route path='/myLibrary' element={<MyLibraryPage />} />
                            <Route path='/myAccount' element={<MyAccountPage sessionID={sessionID} setSessionID={setSessionID} />} />
                            <Route path='/setPreferences' element={<SelectPreferencesPage sessionID={sessionID} />} />
                            <Route path='/signup' element={<CreateAccountPage />} />
                            <Route path='/login' element={<LoginPage setSessionID={setSessionID} />} />
                            <Route path='/logout' element={<LogoutPage sessionID={sessionID} />} />
                            <Route path='/' element={<HomePage setSessionID={setSessionID} sessionID={sessionID} />} />
                        </Routes>
                    </div>
                </Router>
            </UserProvider>
        </div >
    );
}

export default App;