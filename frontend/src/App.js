import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import CreateAccountPage from "./pages/CreateAccount";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";

const App = () => {
    return (
        <div className="App">
            <Router>
                <div>
                    <NavigationBar />

                    <Routes>
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