import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_HREF } from "../../Constants/Navigation";
import AuthContext from "../../Context/AuthContext";
import { Button } from "@mui/material";
import {Modal, Box, Typography} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_ACCOUNT_SCHEMA } from '../../Constants/Schema';
import UserInfoForm from '../../components/UserInfoForm/UserInfoForm'



import "./MyAccountPage.css";

const MyAccountPage = () => {
  const navigate = useNavigate();
  const authState = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({})
  const [usernameField, setUsernameField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#006DAA',
    opacity: '100%',
    boxShadow: 24,
    p: 4,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CREATE_ACCOUNT_SCHEMA),
  });

  const onSubmitHandler = async (data) => {
    console.log(data)
    console.log({ data });
    // call the backend
    const body = {
      username: data.username,
      password: data.password,
      email: data.email,
    };

  };

  useEffect(async () => {
    if (!authState.token) {
      navigate(LOGIN_HREF);
    }

    setUserData(user.user)
    
  }, []);

  const navigateToPreferences = () => {
    navigate("/setPreferences")
  }

  const openUpdateModal = () => {
    handleOpenModal()
  }

  const handleOpenModal = () => setOpenModal(true)

  const handleCloseModal = () => setOpenModal(false)

  return (
    <div className="account-page">
      <div className="section">
        <div className="section-header">
          Account Info
        </div>
        <div className="user-field">
          Username: <span className="field-value">{ userData.username }</span>
        </div>
        <div className="user-field">
          Email: <span className="field-value">{ userData.email }</span>
        </div>
        <div className="user-field">
          <Button onClick={openUpdateModal} type="submit" style={{color: '#EDEDED', backgroundColor: '#050C4E'}}>
            UPDATE ACCOUNT INFO
          </Button>        
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          Update Preferences
        </div>
        <div>
          Genres: { userData.preferences }
        </div>
        <div className="user-field">
          <Button type="submit" style={{color: '#EDEDED', backgroundColor: '#050C4E'}}>
            UPDATE PREFERENCES
          </Button>        
        </div>
      </div>
      <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
       <Box sx={style}>
          <Typography id="modal-modal-title" style={{'color': 'white', 'text-align': 'center'}} variant="h6" component="h2">
            Update Account Info
          </Typography>
          <UserInfoForm schema={CREATE_ACCOUNT_SCHEMA} 
            onSubmit={onSubmitHandler} 
            submitLabelText="update account" />
        </Box>      
      </Modal>
    </div>
  );
};

export default MyAccountPage;
