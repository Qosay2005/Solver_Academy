import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Email,
  Lock,
  Person,
  Phone,
  School,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation/RegisterSchema";
import { useState } from "react";
import axiosInstance from "../../api/axiosinstans";
import { Link } from "react-router-dom";
import useThemeStore from '../../hocks/useThemeStore';

export default function Register() {
  const [serverErrors, setserverErrors] = useState([]);
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === 'dark';
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const RegisterForm = async (data) => {
    try {
      const response = await axiosInstance.post( `/auth/Account/Register`, data);
      console.log(response.data);
    } catch (error) {
      setserverErrors(error.response.data.errors);
    }
  };

  return (
    <Box className={isDark ? "min-h-screen bg-slate-900 px-4 py-6 sm:px-6 flex flex-col justify-between" : "min-h-screen bg-[#dbe7ee] px-4 py-6 sm:px-6 flex flex-col justify-between"}>
      <Box className="flex flex-1 items-center justify-center">
        <Box className="w-full max-w-[24rem]">
          <Box className="mb-5 flex flex-col items-center gap-3 text-center">

          </Box>

          <Box className={isDark ? "rounded-[28px] bg-slate-800 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.25)] sm:p-6" : "rounded-[28px] bg-white p-5 shadow-[0_10px_35px_rgba(9,30,39,0.08)] sm:p-6"}>
            <Box className="mb-4">
              <Typography
                sx={{
                  color: "#091E27",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  mb: 0.5,
                }}
              >
                Create Your Account
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: "0.72rem" }}>
                Start your journey into engineering excellence today.
              </Typography>
            </Box>

            {serverErrors?.map((error, index) => (
              <Typography key={index} sx={{ color: "#d32f2f", fontSize: "0.75rem", mb: 1 }}>
                {error}
              </Typography>
            ))}

            <Box
              component="form"
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(RegisterForm)}
            >
              <TextField
                {...register("fullName")}
                label="Full Name"
                variant="outlined"
                size="small"
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#6b7280", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    backgroundColor: "#eef7fb",
                    color: "#091E27",
                    "& fieldset": {
                      borderColor: "#cbd9e1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9db4c5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#091E27",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#6b7280",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#091E27",
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    marginRight: 0,
                    fontSize: "0.7rem",
                  },
                }}
              />

              <TextField
                {...register("userName")}
                label="Username"
                variant="outlined"
                size="small"
                error={Boolean(errors.userName)}
                helperText={errors.userName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#6b7280", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    backgroundColor: "#eef7fb",
                    color: "#091E27",
                    "& fieldset": {
                      borderColor: "#cbd9e1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9db4c5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#091E27",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#6b7280",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#091E27",
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    marginRight: 0,
                    fontSize: "0.7rem",
                  },
                }}
              />

              <TextField
                {...register("email")}
                label="Email"
                variant="outlined"
                size="small"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#6b7280", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    backgroundColor: "#eef7fb",
                    color: "#091E27",
                    "& fieldset": {
                      borderColor: "#cbd9e1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9db4c5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#091E27",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#6b7280",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#091E27",
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    marginRight: 0,
                    fontSize: "0.7rem",
                  },
                }}
              />

              <TextField
                {...register("password")}
                label="Password"
                variant="outlined"
                type="password"
                size="small"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#6b7280", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    backgroundColor: "#eef7fb",
                    color: "#091E27",
                    "& fieldset": {
                      borderColor: "#cbd9e1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9db4c5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#091E27",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#6b7280",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#091E27",
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    marginRight: 0,
                    fontSize: "0.7rem",
                  },
                }}
              />

              <TextField
                {...register("phoneNumber")}
                label="Phone Number"
                variant="outlined"
                size="small"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: "#6b7280", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    backgroundColor: "#eef7fb",
                    color: "#091E27",
                    "& fieldset": {
                      borderColor: "#cbd9e1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9db4c5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#091E27",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#6b7280",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#091E27",
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    marginRight: 0,
                    fontSize: "0.7rem",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  minHeight: 40,
                  borderRadius: 2,
                  backgroundColor: "#091E27",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#0f2d3a",
                  },
                }}
              >
                {isSubmitting ? (
                  <Box className="flex items-center gap-2">
                    <CircularProgress size={16} sx={{ color: "#ffffff" }} />
                    <span>Creating Account...</span>
                  </Box>
                ) : (
                  "Create Account →"
                )}
              </Button>
            </Box>

            <Box className="mt-4 text-center">
              <Typography sx={{ color: "#6b7280", fontSize: "0.72rem" }}>
                Already have an account? {" "}
                <Box component="span" sx={{ color: "#091E27", fontWeight: 700 }}>
                  <Link to="/login">Login</Link>
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}