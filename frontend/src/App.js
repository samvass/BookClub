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
import Sidebar from "./components/Sidebar";

const App = () => {
    const [username, setUsername] = useState("");

    return (
        <div className="App">
            <Sidebar />
            <Router>
                <div>
                    <Routes>
                        <Route path='/myAccount' element={<MyAccountPage loggedInUser={username} />} />
                        <Route path='/signup' element={<CreateAccountPage />} />
                        <Route path='/login' element={<LoginPage setUserLoggedIn={setUsername} loggedInUser={username} />} />
                        <Route path='/logout' element={<LogoutPage setUserLoggedIn={setUsername} loggedInUser={username} />} />
                        <Route path='/' element={<HomePage />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;