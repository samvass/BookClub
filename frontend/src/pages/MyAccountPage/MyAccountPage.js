import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_HREF } from "../../Constants/Navigation";
import AuthContext from "../../Context/AuthContext";
import { getUserByUserName } from "../../api/userAPI";
import { BsFillPencilFill } from 'react-icons/bs'


import "./MyAccountPage.css";

const MyAccountPage = () => {
  const navigate = useNavigate();
  const authState = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({})

  useEffect(async () => {
    if (!authState.token) {
      navigate(LOGIN_HREF);
    }

    setUserData(user.user)
    
  }, []);

  const navigateToPreferences = () => {
    navigate("/setPreferences")
  }


  return (
    <div className="account-page">
      <div className="section">
        <div className="section-header">
          Account Info
        </div>
        <div className="user-field">
          Username: { userData.username }
          <BsFillPencilFill />
        </div>
        <div className="user-field">
          Email: { userData.email }
          <BsFillPencilFill />
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          Update Preferences
        </div>
        <div>
          Genres: { userData.preferences }
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
