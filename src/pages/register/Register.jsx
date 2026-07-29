import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const RegisterForm = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/Account/Register`,
        data
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">
        Register
      </Typography>

      <form onSubmit={handleSubmit(RegisterForm)}>
        <TextField
          {...register("userName")}
          label="User Name"
          variant="outlined"
        />

        <TextField
          {...register("fullName")}
          label="Full Name"
          variant="outlined"
        />

        <TextField
          {...register("email")}
          label="Email"
          variant="outlined"
        />

        <TextField
          {...register("password")}
          label="Password"
          variant="outlined"
          type="password"
        />

        <TextField
          {...register("phoneNumber")}
          label="Phone Number"
          variant="outlined"
        />

        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </Box>
  );
}