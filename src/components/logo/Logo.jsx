import React from 'react'
import { Box, Typography } from "@mui/material";
import logo from "../../assets/Logo.png"
export default function Logo() {
  return  <>
    <Box className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#091E27] text-white shadow-sm">
               <img src={logo} alt="Logo" />
              </Box>
              <Typography
                sx={{ color: "#1B3A4B", fontWeight: 700, fontSize: "1.15rem" }}
              >
                Hexora Tech
              </Typography>
  
  </>
}
