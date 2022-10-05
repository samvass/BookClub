import { useContext, useEffect } from "react";
import { createAccount, login } from "../api/userAPI";
import { CREATE_ACCOUNT_SCHEMA } from "../Constants/Schema";
import { useNavigate } from "react-router-dom";
import { HOME_HREF } from "../Constants/Navigation";
import AuthContext from "../Context/AuthContext";
import UserInfoForm from '../components/UserInfoForm/UserInfoForm'

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const authState = useContext(AuthContext)


  const { token, setToken } = useContext(AuthContext);

  const onSubmitHandler = async (data) => {
    console.log({ data });
    // call the backend
    const body = {
      username: data.username,
      password: data.password,
      email: data.email,
    };


    const response = await createAccount(body);

    if (response.message === "Account successfully created") {
      const response1 = await login(body);

      if (response1.message === "Login Successful") {
        console.log(response1);
        const sessionInfo = {
          username: response1.data.username,
          token: response1.data.token,
        };
        setToken(sessionInfo);
      }
    }

    reset();
  };


  useEffect(() => {
    if (authState.token) {
        navigate(HOME_HREF)
    }
  }, [authState.token])
  

  return (
    <div>
      <UserInfoForm schema={CREATE_ACCOUNT_SCHEMA} 
      onSubmit={onSubmitHandler} 
      submitLabelText="Create Account" />
    </div>
  );
};


export default CreateAccountPage;
