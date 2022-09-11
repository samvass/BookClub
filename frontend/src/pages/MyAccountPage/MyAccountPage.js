import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_HREF } from "../../Constants/Navigation";
import SessionContext from "../../Context/SessionContext";
import { getUserByUserName } from "../../api/userAPI";


import "./MyAccountPage.css";

const MyAccountPage = () => {
  const navigate = useNavigate();
  const sessionState = useContext(SessionContext);
  const username = sessionStorage.getItem('username')



 // console.log(user)
  console.log(username)

  const [email, setEmail] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([])
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  useEffect(async () => {
    if (!sessionState.token) {
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
    <div className="text">
      <div className="page">
        <div className="preferences">
          <div className="display-properly">
            <h1>Genres</h1>
            <button
              className="password-button"
              id="password-button"
              onClick={() => {
                navigate("/setPreferences");
              }}
            >
              Change Genres
            </button>
          </div>
          <div className="selected-items">{displaySelectedGenres}</div>
        </div>
        <div className="account-info">
          <h1>Account Info</h1>
          <div>
            <h3>Email</h3>
            <h4>{email}</h4>
          </div>
          <div>
            <h3>Username</h3>
            <h4>{username}</h4>
          </div>
          <button
            className="password-button"
            onClick={() => {
              setIsChangePasswordOpen(true);
            }}
          >
            Change Password
          </button>
          <button
            className="password-button"
            onClick={() => setDeleteAccountOpen(true)}
          >
            Delete Account
          </button>
        </div>
      </div>
      {isChangePasswordOpen && (
        <PasswordChangeModal
          onClosePasswordChange={() => {
            setIsChangePasswordOpen(false);
          }}
        />
      )}
      {deleteAccountOpen && (
        <DeleteAccountModal setModalClose={() => setDeleteAccountOpen(false)} />
      )}
    </div>
    // <div>
    //     <div>username</div>
    //     <div>email</div>
    //     <div>preferences</div>
    //     <div>changes password button</div>
    // </div>
  );
};

export default MyAccountPage;
