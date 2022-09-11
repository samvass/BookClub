import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from '../../Constants/Schema'

import "./LoginPage.css"

export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginSchema),
      });

      const onSubmitHandler = (data) => {
        console.log({data});
        reset();

        
      }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input {...register("email")} placeholder="email" type="email" required />
            <p>{errors.email?.message}</p>
            <input {...register("password")} placeholder="password" type="password" required />
            <p>{errors.password?.message}</p>
            <button type="submit">Sign In</button>
        </form>
    </div>
  )
}

export default LoginPage;