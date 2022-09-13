import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_HREF } from "../../Constants/Navigation";
import AuthContext from "../../Context/AuthContext";
import { getUserByUserName } from "../../api/userAPI";


import "./MyAccountPage.css";

const MyAccountPage = () => {
  const navigate = useNavigate();
  const authState = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const username = sessionStorage.getItem('username')

  const [email, setEmail] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([])
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  useEffect(async () => {
    if (!authState.token) {
      navigate(LOGIN_HREF);
    }

    if (sessionStorage.getItem('username')) {
      console.log(username)
      const incomingUserData = await getUserByUserName(sessionStorage.getItem('username'));
  
      console.log(incomingUserData)
      setEmail(incomingUserData.user.email)
  
      const incomingPreferences = await getPreferencesByUsername(username)
      setSelectedGenres(incomingPreferences.data)
    }
    
  }, []);

  const displaySelectedGenres = selectedGenres.map((genre, index) => {
    return <div className="selected-item" key={index}>{genre}</div>
})

  return (
    <div>
      Username: { user.username }
      Email: { user.email }
      Genres: { user.preferences }
    </div>
  );
};

export default MyAccountPage;
