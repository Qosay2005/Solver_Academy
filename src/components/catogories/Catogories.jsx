import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import useCatogories from '../../hocks/useCatogories';
export default function Catogories() {
 
   const {data,isLoading,isError,Error} = useCatogories(); 
   
     if(isLoading)
       return  <CircularProgress/>
        if(isError)
            return <Typography color="red">{Error}</Typography>
    return <section className="flex gap-3">
       {data.response.data.map((catogoriy)=>(
        
            <Typography>{catogoriy.name}</Typography>      
          
      ))}
    </section>
  
}
