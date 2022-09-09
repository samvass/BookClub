import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages//HomePage/HomePage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import LogoutPage from "./pages/LogoutPage";
import MyLibraryPage from "./pages/MyLibraryPage/MyLibraryPage";
import NavBar from "./components/navbar/NavBar";
import SelectPreferencesPage from "./pages/SelectPreferencesPage/SelectPreferencesPage"
import { authenticateUserByToken } from "./api/authAPI";

import "./App.css"
import TokenContext from './Context/TokenContext'

const App = () => {

    const authToken = async (token) => {
        // call the backend to authenticate
        const body = {
            token: token
        }
        const res = await authenticateUserByToken(body)

        sessionStorage.setItem("token", token)

        setToken(token)
    }

    useEffect(() => {
        authToken(sessionStorage.getItem("token"))
    }, [])
    

    const [token, setToken] = useState('')

    return (
        <div>
        <div className="App">
            <TokenContext.Provider value={{token: token, setToken: authToken}}>
            <Router>
                <NavBar />
                <div>
                    <Routes>
                        {token && <Route path='/myLibrary' element={<MyLibraryPage />} />}
                        {token && <Route path='/myAccount' element={<MyAccountPage />} />}
                        {token && <Route path='/setPreferences' element={<SelectPreferencesPage />} />}
                        {token && <Route path='/logout' element={<LogoutPage />} />}
                        {token && <Route path='/' element={<HomePage />} />}
                        <Route path='/signup' element={<CreateAccountPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        
                    </Routes>
                </div>
            </Router>
            </TokenContext.Provider>
            </div>
            <div className='spacer'></div>
        </div >
    );
}

export default App;