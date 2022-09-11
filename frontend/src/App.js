import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages//HomePage/HomePage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import LogoutPage from "./pages/LogoutPage";
import MyLibraryPage from "./pages/MyLibraryPage/MyLibraryPage";
import NavBar from "./components/Navbar/NavBar";
import SelectPreferencesPage from "./pages/SelectPreferencesPage/SelectPreferencesPage"
import { authenticateUserByToken } from "./api/authAPI";

import "./App.css"
import TokenContext from './Context/TokenContext'
import UserContext from "./Context/UserContext";
import SessionContext from "./Context/SessionContext";

const App = () => {

    const [user, setUser] = useState({})
    const [token, setToken] = useState(null)

    return (

        <div className="App">

        <SessionContext.Provider value={{
            token: token,
            user: user,
            setToken: setToken,
            setUser: setUser,
        }}>

            <Router>
                <NavBar />
                <Routes>
                   <Route path='/' element={<HomePage />} />
                   <Route path='/myAccount' element={<MyAccountPage />} />
                   <Route path='/login' element={<LoginPage />} />
                </Routes>
            </Router>
        </SessionContext.Provider>

        </div>
        // <div>
        //     <div className="App">
        //     <TokenContext.Provider value={{token: token, setToken: authToken}}>
        //     <Router>
        //         <NavBar />
        //         <div>
        //             <UserContext.Provider value={{user: user, setUser: setUser}}>
        //             <Routes>
        //                 {token && <Route path='/myLibrary' element={<MyLibraryPage />} />}
        //                 {token && <Route path='/myAccount' element={<MyAccountPage />} />}
        //                 {token && <Route path='/setPreferences' element={<SelectPreferencesPage />} />}
        //                 {token && <Route path='/logout' element={<LogoutPage />} />}
        //                 {token && <Route path='/' element={<HomePage />} />}
        //                 <Route path='/signup' element={<CreateAccountPage />} />
        //                 <Route path='/login' element={<LoginPage />} />
        //             </Routes>
        //             </UserContext.Provider>
        //         </div>
        //     </Router>
        //     </TokenContext.Provider>
        //     </div>
        //     <div className='spacer'>
        //     </div>
        // </div >
    );
}

export default App;