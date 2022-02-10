import React from "react";
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

const App = () => {
    return (
        <div className="App">
            <Router>
                <div>
                    <NavigationBar />

                    <Routes>
                        <Route path='/myAccount' element={<MyAccountPage />} />
                        <Route path='/signup' element={<CreateAccountPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/' element={<HomePage />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;