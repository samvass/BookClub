import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {SCHEMA_TEXT} from '../../Constants/Schema'

const UserInfoForm = ({schema, onSubmit, submitLabelText}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {

    onSubmit(data)
    reset();

  };
  

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <ul className="login">
            {schema._nodes.map((field) => {
                return (
                    <li className="input" key={field}>
                        <p className="input-header">{SCHEMA_TEXT[field].label}</p>
                        <input className="input-field" {...register(field)} placeholder={SCHEMA_TEXT[field].placeholder} type={field === "password" || field === 'retypePassword' ? "password" : "text"} />
                        <p className="validation-error">{errors.email?.message}</p>
                    </li>
                )
            })}
          <li>
            <Button type="submit" style={{color: '#EDEDED', backgroundColor: '#050C4E'}}>
                {submitLabelText}
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
};


export default UserInfoForm;
