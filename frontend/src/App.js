import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages//HomePage/HomePage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import LogoutPage from "./pages/LogoutPage";
import MyLibraryPage from "./pages/MyLibraryPage/MyLibraryPage";
import NavBar from "./components/navbar/NavBar";
import SelectPreferencesPage from "./pages/SelectPreferencesPage/SelectPreferencesPage"

import "./App.css"
import UserProvider from "./user/UserProvider";
import SessionProvider from "./session/SessionProvider";

const App = () => {

    return (
        <div>
            <div className="App">
                <SessionProvider>
                    <UserProvider>
                        <Router>
                            <NavBar />
                            <div>
                                <Routes>
                                    <Route path='/myLibrary' element={<MyLibraryPage />} />
                                    <Route path='/myAccount' element={<MyAccountPage />} />
                                    <Route path='/setPreferences' element={<SelectPreferencesPage />} />
                                    <Route path='/signup' element={<CreateAccountPage />} />
                                    <Route path='/login' element={<LoginPage />} />
                                    <Route path='/logout' element={<LogoutPage />} />
                                    <Route path='/' element={<HomePage />} />
                                </Routes>
                            </div>
                        </Router>
                    </UserProvider>
                </SessionProvider>
            </div>
            <div className='spacer'></div>
        </div >
    );
}

export default App;