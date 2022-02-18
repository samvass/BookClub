import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import LogoutPage from "./pages/LogoutPage";
import MyLibraryPage from "./pages/MyLibraryPage/MyLibraryPage";

import "./App.css"

const App = () => {
    const [username, setUsername] = useState("");
    const [sessionID, setSessionID] = useState(null);

    return (
        <div className="App">
            <Router>
                <NavigationBar loggedInUser={username} />
                <div>
                    <Routes>
                        <Route path='/myLibrary' element={<MyLibraryPage loggedInUser={username} />} />
                        <Route path='/myAccount' element={<MyAccountPage loggedInUser={username} />} />
                        <Route path='/signup' element={<CreateAccountPage />} />
                        <Route path='/login' element={
                            <LoginPage setUserLoggedIn={setUsername} loggedInUser={username} setSessionID={setSessionID} />
                        } />
                        <Route path='/logout' element={<LogoutPage setUserLoggedIn={setUsername} loggedInUser={username} sessionID={sessionID} />} />
                        <Route path='/' element={<HomePage />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;