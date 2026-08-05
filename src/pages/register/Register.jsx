import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {registerSchema} from "../../validation/RegisterSchema"
import { useState } from "react";
export default function Register() {
  const [serverErrors,setserverErrors] = useState([]) 
  const { register, handleSubmit,formState:{errors,isSubmitting} } = useForm({
     resolver :yupResolver(registerSchema)
  });

  const RegisterForm = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/Account/Register`,
        data
      );

      console.log(response.data);
    } catch (error) {
     setserverErrors(error.response.data.errors);
    }
  };

  return (
    <div className="bg-[#C3D6E5] p-4 text-center">
     <div className = "bg-[#FFFFFF] p-4 rounded-lg">
       <Typography variant="h4" className="text-[#091E27]">
        Create Your Account
      </Typography>
    {
    serverErrors?.map((error,index)=>(
     <Typography key={index} color="error">
     {error}
     </Typography>
    ))
   }
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(RegisterForm)}>
        <TextField
          {...register("userName")}
          label="User Name"
          variant="outlined"
          error = {errors.userName}
          helperText={errors.userName?.message}
        />

        <TextField
          {...register("fullName")}
          label="Full Name"
          variant="outlined"
          error = {errors.fullName}
          helperText={errors.fullName?.message}
        />

        <TextField
          {...register("email")}
          label="Email"
          variant="outlined"
          error = {errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("password")}
          label="Password"
          variant="outlined"
          type="password"
          error = {errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          {...register("phoneNumber")}
          label="Phone Number"
          variant="outlined"
          error = {errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting? <CircularProgress/>:"Register"}
        </Button>
      </form>
     </div>
    </div>
  );
}