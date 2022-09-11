import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  useEffect, useState } from "react";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages//HomePage/HomePage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import NavBar from "./components/navbar/NavBar"
import { authenticateUserByToken } from "./api/authAPI";
import { getUserByUserName } from '../src/api/userAPI';
import "./App.css"
import SessionContext from "./Context/SessionContext";
import LogoutPage from "./pages/LogoutPage";

const App = () => {

    const [user, setUser] = useState({})
    const [token, setToken] = useState(null)

    const authToken = async (sessionInfo) => {
        const { username, token } = sessionInfo
        // call the backend to authenticate
        console.log("HANDLING TOKENS")
        const body = {
            token: token
        }
        const res = await authenticateUserByToken(body)
        console.log(res)
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("token", token)
        setToken(token)

        const user = await getUserByUserName(username)
        console.log("found user", user)
        setUser(user)
    }

    const logout = () =>{
        setToken('')
    }

    useEffect(() => {
        if (sessionStorage.length > 0) {
            authToken(sessionStorage.getItem("token"))
        }
    }, [])

    return (

        <div className="App">

        <SessionContext.Provider value={{
            token: token,
            user: user,
            setToken: authToken,
            setUser: setUser,
            logout: logout,
        }}>

            <Router>
                <NavBar />
                <Routes>
                   <Route path='/' element={<HomePage />} />
                   <Route path='/myAccount' element={<MyAccountPage />} />
                   <Route path='/login' element={<LoginPage />} />
                   <Route path='/signup' element={<CreateAccountPage />} />
                   <Route path='/logout' element={<LogoutPage />} />
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