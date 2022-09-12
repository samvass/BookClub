import { useContext, useEffect } from "react";
import { createAccount, login } from "../api/userAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_ACCOUNT_SCHEMA } from "../Constants/Schema";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
  const navigate = useNavigate();

  const { token, setToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CREATE_ACCOUNT_SCHEMA),
  });

  const onSubmitHandler = async (data) => {
    console.log({ data });
    // call the backend
    const body = {
      username: data.username,
      password: data.password,
      email: data.email,
    };

    console.log(body);

    const response = await createAccount(body);
    console.log(response);

    if (response.message === "Account successfully created") {
      const response1 = await login(body);
      console.log(response1);
      // if backend approves of the info
      if (response1.message === "Login Successful") {
        console.log("k the login worked");
        console.log(response1);
        const sessionInfo = {
          username: response1.data.username,
          token: response1.data.token,
        };
        setToken(sessionInfo);
        console.log("hi there");
        // if backend sends an error
      }
    }

    reset();
  };

  useEffect(() => {
    console.log("this is the token: ", token);
    navigate("/");
  }, [token]);

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          {...register("email")}
          placeholder="email"
          type="email"
          required
        />
        <p>{errors.email?.message}</p>
        <input
          {...register("username")}
          placeholder="username"
          type="text"
          required
        />
        <p>{errors.username?.message}</p>
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          required
        />
        <p>{errors.password?.message}</p>
        <input
          {...register("retypePassword")}
          placeholder="retypePassword"
          type="password"
          required
        />
        <p>{errors.retypePassword?.message}</p>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

// const CreateAccountPageOld = () => {
//     const { setUsername } = useContext(UserContext)

//     const [enteredUsername, setEnteredUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [password2, setPassword2] = useState("");
//     const [email, setEmail] = useState("");
//     const [errorMsg, setErrorMsg] = useState();
//     const [successMsg, setSuccessMsg] = useState("");

//     const emailHandler = (event) => {
//         let typedEmail = event.target.value;
//         setEmail(typedEmail);
//     }

//     const usernameHandler = (event) => {
//         let typedUsername = event.target.value;
//         setEnteredUsername(typedUsername);
//     }

//     const passwordHandler = (event) => {
//         let typedPassword = event.target.value;
//         setPassword(typedPassword);
//     }

//     const password2Handler = (event) => {
//         let typedPassword2 = event.target.value;
//         setPassword2(typedPassword2);
//     }

//     const signup = async (event, callback) => {
//         event.preventDefault();

//         if (password !== password2) {
//             setErrorMsg(["Passwords do not match"])
//             return
//         }

//         // call the backend
//         const body = {
//             "username": enteredUsername,
//             "password": password,
//             "email": email
//         }

//         console.log(body)

//         const response = await createAccount(body);
//         console.log(response)

//         if (response.message === "Account successfully created") {
//             setErrorMsg(null)

//             console.log(body)
//             const response1 = await login(body)
//             console.log(response1)

//             setUsername(enteredUsername)

//             setTimeout(() => {
//                 setSuccessMsg(response1.message);
//             }, 400)

//         } else {
//             setErrorMsg(response.error)
//         }
//     }

//     let displayErrorMessages = []

//     if (errorMsg) {
//         displayErrorMessages = errorMsg.map((err) => {
//             return <Alert variant="danger" key={err}>{err}</Alert>;
//         })
//     }

//     return <div>
//         <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
//             <Form>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control type="email"
//                         value={email} onChange={emailHandler} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicUsername">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control type="text"
//                         value={enteredUsername} onChange={usernameHandler} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control type="password"
//                         value={password} onChange={passwordHandler} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword2">
//                     <Form.Label>Re-Enter Password</Form.Label>
//                     <Form.Control type="password"
//                         value={password2} onChange={password2Handler} />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" onClick={signup}>
//                     Create Account
//                 </Button>
//             </Form>
//             <br />

//             {errorMsg && displayErrorMessages}
//             {successMsg !== "" && <Alert variant="success" key={successMsg}>{successMsg}</Alert>}
//             {successMsg !== "" && <Navigate to="/setPreferences" />}
//         </div>
//     </div>
// }

export default CreateAccountPage;
