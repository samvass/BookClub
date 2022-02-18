import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import CreateAccountPage from "./pages/createAccount";
import LoginPage from "./pages/login";
import HomePage from "./pages/homePage";

const App = () => {
    return (
        <div className="App">
            <Router>
<<<<<<< Updated upstream
=======
                {/* <NavigationBar loggedInUser={username}/> */}
>>>>>>> Stashed changes
                <div>
                    <NavigationBar />

                    <Routes>
                        <Route path='/signup' element={<CreateAccountPage />} />
<<<<<<< Updated upstream
                        <Route path='/login' element={<LoginPage />} />
=======

                        <Route path='/login' element={
                            <LoginPage setUserLoggedIn={setUsername} loggedInUser={username} setSessionID={setSessionID} />
                        } />

                        <Route path='/logout' element={<LogoutPage setUserLoggedIn={setUsername} loggedInUser={username} sessionID={sessionID} />} />

>>>>>>> Stashed changes
                        <Route path='/' element={<HomePage />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;